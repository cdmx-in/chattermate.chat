"""
ChatterMate - Nova Framework Guardrails Module
Copyright (C) 2024 ChatterMate

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU Affero General Public License as
published by the Free Software Foundation, either version 3 of the
License, or (at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU Affero General Public License for more details.

You should have received a copy of the GNU Affero General Public License
along with this program.  If not, see <https://www.gnu.org/licenses/>

Nova Framework Integration for Advanced Prompt Guardrails
Based on: https://github.com/fr0gger/nova-framework
"""

import os
from typing import Dict, List, Tuple, Optional, Any
from enum import Enum
from dataclasses import dataclass, field
from app.core.logger import get_logger

logger = get_logger(__name__)

# Nova Framework imports
try:
    from nova.core.parser import NovaParser
    from nova.core.matcher import NovaMatcher
    from nova.evaluators.llm import OpenAIEvaluator, GroqEvaluator
    NOVA_AVAILABLE = True
except ImportError as e:
    logger.warning(f"Nova Framework not available: {e}")
    NOVA_AVAILABLE = False


class NovaGuardrailType(str, Enum):
    """Types of Nova-based guardrails"""
    PII = "pii"
    JAILBREAK = "jailbreak"
    PROMPT_INJECTION = "prompt_injection"
    MALICIOUS_CODE = "malicious_code"
    HARMFUL_CONTENT = "harmful_content"
    DATA_EXFILTRATION = "data_exfiltration"


class NovaGuardrailAction(str, Enum):
    """Actions to take when guardrail is triggered"""
    BLOCK = "block"
    REDACT = "redact"
    WARNING = "warning"
    LOG = "log"


@dataclass
class NovaGuardrailResult:
    """Result of Nova guardrail evaluation"""
    passed: bool
    guardrail_type: NovaGuardrailType
    violations: List[str] = field(default_factory=list)
    redacted_text: Optional[str] = None
    confidence: float = 0.0
    nova_details: Optional[Dict[str, Any]] = None
    
    def to_dict(self) -> Dict:
        """Convert result to dictionary"""
        return {
            "passed": self.passed,
            "guardrail_type": self.guardrail_type.value,
            "violations": self.violations,
            "redacted_text": self.redacted_text,
            "confidence": self.confidence,
            "nova_details": self.nova_details
        }


# Nova Rules for different guardrail types
NOVA_RULES = {
    NovaGuardrailType.PII: """
rule PIIDetection
{
    meta:
        description = "Detects Personally Identifiable Information"
        author = "ChatterMate"
        severity = "high"

    keywords:
        $email_pattern = /[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,}/
        $phone_pattern = /\\b(?:\\+?1[-.]?)?\\(?[0-9]{3}\\)?[-. ]?[0-9]{3}[-. ]?[0-9]{4}\\b/
        $ssn_pattern = /\\b\\d{3}-\\d{2}-\\d{4}\\b/
        $credit_card = /\\b\\d{4}[-\\s]?\\d{4}[-\\s]?\\d{4}[-\\s]?\\d{4}\\b/
        $ip_address = /\\b(?:[0-9]{1,3}\\.){3}[0-9]{1,3}\\b/

    condition:
        any of keywords.*
}
""",

    NovaGuardrailType.JAILBREAK: """
rule JailbreakDetection
{
    meta:
        description = "Detects jailbreak and prompt manipulation attempts"
        author = "ChatterMate"
        severity = "critical"

    keywords:
        $ignore_instructions = /ignore (previous|all|the above|your) (instructions|rules|prompts?)/i
        $disregard = /disregard (previous|all|the above|your) (instructions|rules|prompts?)/i
        $forget = /forget (previous|all|the above|your) (instructions|rules|prompts?)/i
        $pretend = /pretend (you are|to be|you're)/i
        $act_as = /act (as|like) (a|an)/i
        $you_are_now = /you are now (a|an)/i
        $from_now = "from now on"
        $dan = /\\bDAN\\b/
        $do_anything = "do anything now"
        $system_tag = /\\[SYSTEM\\]/
        $inst_tag = /\\[INST\\]/
        $im_start = /<\\|im_start\\|>/
        $im_end = /<\\|im_end\\|>/
        $no_restrictions = /without (any )?restrictions?/i
        $bypass = /(bypass|override|disable) (safety|ethics|rules|guidelines)/i
        $sudo = "sudo"
        $admin_mode = "administrator mode"
        $dev_mode = "developer mode"
        $debug_mode = "debug mode"

    semantics:
        $jailbreak_attempt = "attempting to bypass AI safety measures or override instructions" (0.3)
        $role_manipulation = "trying to make AI act as different persona or ignore guidelines" (0.3)

    condition:
        any of keywords.* or any of semantics.*
}
""",

    NovaGuardrailType.PROMPT_INJECTION: """
rule PromptInjection
{
    meta:
        description = "Detects prompt injection attacks"
        author = "ChatterMate"
        severity = "critical"

    keywords:
        $repeat_prompt = /repeat (your|the) (system )?prompt/i
        $show_instructions = /what (is|are) your (instructions|rules|system prompt)/i
        $reveal_prompt = /show me your (instructions|rules|system prompt)/i
        $overrides = /this (overrides|supersedes) (all|any|your)/i
        $must_obey = /you (must|should|have to) (obey|follow|comply)/i
        $new_instructions = /(new|updated|revised) instructions/i
        $end_system = /(end|close) (of )?(system|assistant) (message|prompt)/i
        $injection_marker = /<<<|>>>|\\{\\{|\\}\\}/

    semantics:
        $injection_attempt = "attempting to inject malicious instructions or extract system prompt" (0.4)
        $context_manipulation = "trying to manipulate conversation context or override system behavior" (0.4)

    condition:
        any of keywords.* or any of semantics.*
}
""",

    NovaGuardrailType.MALICIOUS_CODE: """
rule MaliciousCodeRequest
{
    meta:
        description = "Detects requests for malicious code or exploits"
        author = "ChatterMate"
        severity = "high"

    keywords:
        $exploit = "exploit"
        $malware = "malware"
        $ransomware = "ransomware"
        $backdoor = "backdoor"
        $keylogger = "keylogger"
        $rootkit = "rootkit"
        $shellcode = "shellcode"
        $payload = /malicious payload/i
        $cve_exploit = /CVE-\\d{4}-\\d+.*exploit/i
        $reverse_shell = /reverse shell/i
        $sql_injection = /sql injection/i
        $xss_attack = /xss attack/i

    semantics:
        $malware_request = "requesting code for malware, viruses, or system exploitation" (0.5)
        $hacking_tools = "asking for hacking tools or exploitation techniques" (0.5)

    condition:
        any of keywords.* or any of semantics.*
}
""",

    NovaGuardrailType.HARMFUL_CONTENT: """
rule HarmfulContent
{
    meta:
        description = "Detects requests for harmful or dangerous content"
        author = "ChatterMate"
        severity = "critical"

    keywords:
        $weapon = /how to (make|build|create) (a )?(weapon|bomb|explosive)/i
        $poison = /how to (make|create) poison/i
        $illegal_drugs = /how to (make|synthesize|produce) (meth|cocaine|heroin|drugs)/i
        $violence = /(kill|murder|harm|injure) (someone|a person)/i

    semantics:
        $harmful_instructions = "requesting instructions for creating weapons, drugs, or causing harm" (0.6)
        $dangerous_content = "asking for content that could lead to physical harm or illegal activities" (0.6)

    condition:
        any of keywords.* or any of semantics.*
}
""",

    NovaGuardrailType.DATA_EXFILTRATION: """
rule DataExfiltration
{
    meta:
        description = "Detects attempts to extract sensitive system data"
        author = "ChatterMate"
        severity = "high"

    keywords:
        $list_files = /list (all )?(files|directories|folders)/i
        $env_vars = /(show|print|display) (environment|env) variables/i
        $api_keys = /(show|give|reveal) (api|secret) keys/i
        $passwords = /(show|give|reveal) passwords/i
        $database = /access (the )?database/i
        $config = /show (system )?config/i

    semantics:
        $data_extraction = "attempting to extract sensitive system information or credentials" (0.5)
        $unauthorized_access = "trying to access restricted system resources or data" (0.5)

    condition:
        any of keywords.* or any of semantics.*
}
"""
}


class NovaGuardrailsEngine:
    """
    Nova Framework-powered guardrails engine for advanced prompt protection
    """
    
    def __init__(self, llm_evaluator_type: str = "openai", model: str = None):
        """
        Initialize the Nova Guardrails Engine
        
        Args:
            llm_evaluator_type: Type of LLM evaluator ("openai", "groq")
            model: Model name to use for LLM evaluation
        """
        self.llm_evaluator = None
        self.parser = None
        self.matchers: Dict[NovaGuardrailType, NovaMatcher] = {}
        
        if not NOVA_AVAILABLE:
            logger.warning("Nova Framework not available, falling back to basic guardrails")
            return
        
        try:
            self.parser = NovaParser()
            self._initialize_llm_evaluator(llm_evaluator_type, model)
            self._compile_rules()
        except Exception as e:
            logger.error(f"Failed to initialize Nova Guardrails Engine: {e}")
    
    def _initialize_llm_evaluator(self, evaluator_type: str, model: str = None):
        """Initialize the LLM evaluator for semantic analysis"""
        try:
            if evaluator_type == "groq":
                api_key = os.environ.get("GROQ_API_KEY")
                if api_key:
                    self.llm_evaluator = GroqEvaluator(
                        api_key=api_key,
                        model=model or "llama-3.3-70b-versatile"
                    )
                    logger.info("Initialized Groq evaluator for Nova guardrails")
            else:  # default to openai
                api_key = os.environ.get("OPENAI_API_KEY")
                if api_key:
                    self.llm_evaluator = OpenAIEvaluator(
                        api_key=api_key,
                        model=model or "gpt-6-luna"
                    )
                    logger.info("Initialized OpenAI evaluator for Nova guardrails")
        except Exception as e:
            logger.warning(f"Failed to initialize LLM evaluator: {e}. Using keyword/semantic matching only.")
    
    def _compile_rules(self):
        """Compile Nova rules for each guardrail type"""
        for guardrail_type, rule_text in NOVA_RULES.items():
            try:
                rule = self.parser.parse(rule_text)
                matcher = NovaMatcher(
                    rule,
                    llm_evaluator=self.llm_evaluator,
                    create_llm_evaluator=False
                )
                self.matchers[guardrail_type] = matcher
                logger.debug(f"Compiled Nova rule for {guardrail_type.value}")
            except Exception as e:
                logger.error(f"Failed to compile rule for {guardrail_type.value}: {e}")
    
    def check(
        self,
        text: str,
        guardrail_type: NovaGuardrailType,
        sensitivity: float = 0.7
    ) -> NovaGuardrailResult:
        """
        Check text against a specific Nova guardrail
        
        Args:
            text: Text to check
            guardrail_type: Type of guardrail to apply
            sensitivity: Detection sensitivity (0.0-1.0)
            
        Returns:
            NovaGuardrailResult with detection results
        """
        if not NOVA_AVAILABLE or guardrail_type not in self.matchers:
            # Fallback to basic detection
            return self._fallback_check(text, guardrail_type, sensitivity)
        
        try:
            matcher = self.matchers[guardrail_type]
            result = matcher.check_prompt(text)
            
            matched = result.get("matched", False)
            violations = []
            confidence = 0.0
            
            # Extract matching details
            if matched:
                # Get matching keywords
                for key, value in result.get("matching_keywords", {}).items():
                    if value:
                        violations.append(f"Keyword match: {key}")
                
                # Get matching semantics
                for key, value in result.get("matching_semantics", {}).items():
                    if value:
                        violations.append(f"Semantic match: {key}")
                
                # Get matching LLM patterns
                for key, value in result.get("matching_llm", {}).items():
                    if value:
                        violations.append(f"LLM match: {key}")
                
                # Calculate confidence based on number of matches
                total_matches = len(violations)
                confidence = min(total_matches * 0.3, 1.0)
            
            # Apply sensitivity threshold
            passed = not matched or confidence < sensitivity
            
            logger.info(
                f"Nova guardrail check - Type: {guardrail_type.value}, "
                f"Matched: {matched}, Confidence: {confidence:.2f}, "
                f"Passed (with sensitivity {sensitivity}): {passed}"
            )
            
            return NovaGuardrailResult(
                passed=passed,
                guardrail_type=guardrail_type,
                violations=violations,
                confidence=confidence,
                nova_details=result
            )
            
        except Exception as e:
            logger.error(f"Error in Nova guardrail check: {e}")
            return self._fallback_check(text, guardrail_type, sensitivity)
    
    def _fallback_check(
        self,
        text: str,
        guardrail_type: NovaGuardrailType,
        sensitivity: float
    ) -> NovaGuardrailResult:
        """Fallback to basic regex-based detection"""
        from app.utils.guardrails import PIIDetector, JailbreakDetector, GuardrailAction, GuardrailType
        
        if guardrail_type == NovaGuardrailType.PII:
            basic_result = PIIDetector.detect(text, GuardrailAction.BLOCK)
            return NovaGuardrailResult(
                passed=basic_result.passed,
                guardrail_type=guardrail_type,
                violations=basic_result.violations,
                redacted_text=basic_result.redacted_text,
                confidence=basic_result.confidence
            )
        elif guardrail_type == NovaGuardrailType.JAILBREAK:
            basic_result = JailbreakDetector.detect(text, sensitivity)
            return NovaGuardrailResult(
                passed=basic_result.passed,
                guardrail_type=guardrail_type,
                violations=basic_result.violations,
                confidence=basic_result.confidence
            )
        else:
            # For other types, return passed by default
            return NovaGuardrailResult(
                passed=True,
                guardrail_type=guardrail_type,
                violations=[],
                confidence=0.0
            )
    
    def evaluate(
        self,
        text: str,
        enabled_guardrails: List[NovaGuardrailType],
        actions: Dict[NovaGuardrailType, NovaGuardrailAction] = None,
        sensitivity: float = 0.7
    ) -> Tuple[bool, List[NovaGuardrailResult]]:
        """
        Evaluate text against multiple Nova guardrails
        
        Args:
            text: Text to evaluate
            enabled_guardrails: List of guardrail types to check
            actions: Dictionary mapping guardrail types to actions
            sensitivity: Detection sensitivity (0.0-1.0)
            
        Returns:
            Tuple of (all_passed, list_of_results)
        """
        if actions is None:
            actions = {}
        
        results = []
        all_passed = True
        
        for guardrail_type in enabled_guardrails:
            result = self.check(text, guardrail_type, sensitivity)
            results.append(result)
            
            if not result.passed:
                action = actions.get(guardrail_type, NovaGuardrailAction.BLOCK)
                if action == NovaGuardrailAction.BLOCK:
                    all_passed = False
        
        return all_passed, results
    
    def get_block_message(self, results: List[NovaGuardrailResult]) -> str:
        """Generate a user-friendly message when content is blocked"""
        failed_guardrails = [r for r in results if not r.passed]
        
        if not failed_guardrails:
            return "Your message has been processed successfully."
        
        guardrail_types = [r.guardrail_type for r in failed_guardrails]
        
        if NovaGuardrailType.PII in guardrail_types:
            return (
                "I noticed your message contains sensitive personal information. "
                "For your privacy and security, please avoid sharing personal details "
                "like email addresses, phone numbers, or other identifying information."
            )
        
        if NovaGuardrailType.JAILBREAK in guardrail_types or NovaGuardrailType.PROMPT_INJECTION in guardrail_types:
            return (
                "I'm designed to help you with legitimate questions and tasks. "
                "I can't process requests that ask me to ignore my guidelines or "
                "behave in ways I'm not designed for. How else can I assist you?"
            )
        
        if NovaGuardrailType.MALICIOUS_CODE in guardrail_types:
            return (
                "I'm unable to provide assistance with creating malicious software "
                "or exploitation tools. I'm here to help with constructive tasks. "
                "How else can I assist you?"
            )
        
        if NovaGuardrailType.HARMFUL_CONTENT in guardrail_types:
            return (
                "I'm designed to be helpful and safe. I can't assist with requests "
                "that could lead to harm. How else can I help you today?"
            )
        
        if NovaGuardrailType.DATA_EXFILTRATION in guardrail_types:
            return (
                "I'm unable to provide access to system resources or sensitive data. "
                "I'm here to help with legitimate questions and tasks."
            )
        
        return (
            "I'm unable to process your message as it doesn't meet our "
            "content guidelines. Please rephrase your request."
        )


# Singleton instance
_nova_engine: Optional[NovaGuardrailsEngine] = None


def get_nova_engine() -> NovaGuardrailsEngine:
    """Get or create the Nova Guardrails Engine singleton"""
    global _nova_engine
    if _nova_engine is None:
        _nova_engine = NovaGuardrailsEngine()
    return _nova_engine


def check_nova_guardrails(
    text: str,
    guardrail_types: List[str],
    pii_action: str = "block",
    sensitivity: float = 0.7
) -> Tuple[bool, List[Dict], str]:
    """
    Convenience function to check text against Nova guardrails
    
    Args:
        text: Text to check
        guardrail_types: List of guardrail type strings
        pii_action: Action for PII ("block", "redact", "warning", "log")
        sensitivity: Detection sensitivity
        
    Returns:
        Tuple of (passed, results_list, block_message)
    """
    engine = get_nova_engine()
    
    # Map string types to enum
    enabled_guardrails = []
    actions = {}
    
    type_mapping = {
        "pii": NovaGuardrailType.PII,
        "jailbreak": NovaGuardrailType.JAILBREAK,
        "prompt_injection": NovaGuardrailType.PROMPT_INJECTION,
        "malicious_code": NovaGuardrailType.MALICIOUS_CODE,
        "harmful_content": NovaGuardrailType.HARMFUL_CONTENT,
        "data_exfiltration": NovaGuardrailType.DATA_EXFILTRATION
    }
    
    action_mapping = {
        "block": NovaGuardrailAction.BLOCK,
        "redact": NovaGuardrailAction.REDACT,
        "warning": NovaGuardrailAction.WARNING,
        "log": NovaGuardrailAction.LOG
    }
    
    for gt in guardrail_types:
        guardrail_type = type_mapping.get(gt.lower())
        if guardrail_type:
            enabled_guardrails.append(guardrail_type)
            if guardrail_type == NovaGuardrailType.PII:
                actions[guardrail_type] = action_mapping.get(pii_action.lower(), NovaGuardrailAction.BLOCK)
    
    passed, results = engine.evaluate(
        text,
        enabled_guardrails,
        actions,
        sensitivity
    )
    
    block_message = engine.get_block_message(results)
    results_dict = [r.to_dict() for r in results]
    
    return passed, results_dict, block_message
