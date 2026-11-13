# devops-final

Итоговая КТ по DevOps: Node.js-приложение с метриками Prometheus, Docker, Compose (app + Prometheus + Grafana), CI/CD в GitHub Actions с публикацией в ghcr.io и развёртывание через Ansible.

```bash
docker compose up -d
```

- приложение: http://localhost:3000 (`/`, `/health`, `/metrics`)
- Prometheus: http://localhost:9090/targets
- Grafana: http://localhost:3001 (admin / admin), дашборд «DevOps Final»
