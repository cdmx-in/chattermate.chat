cd /root/chattermate.chat/frontend && npm run build:widget:dev

cd /root/chattermate.chat && docker compose -f docker-compose.yml restart backend frontend nginx 2>&1 | grep Started