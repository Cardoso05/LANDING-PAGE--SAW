# 🚀 Deploy Automático - TeknoLab Landing Page

## Como Configurar Deploy Automático com GitHub Actions

### 1. Configurar Secrets no GitHub

Acesse: `https://github.com/Cardoso05/LANDING-PAGE--SAW/settings/secrets/actions`

Adicione estes secrets:

```
VPS_HOST = seu-ip-da-vps.hostinger.com (ou IP direto)
VPS_USERNAME = root (ou seu usuário SSH)
VPS_PASSWORD = sua-senha-ssh
```

### 2. Estrutura de Pastas na VPS

```
/var/www/html/
├── current/     ← Versão ativa do site
├── backup/      ← Backup da versão anterior
└── temp/        ← Upload temporário
```

### 3. Configurar Nginx na VPS

```nginx
server {
    listen 80;
    server_name seu-dominio.com www.seu-dominio.com;
    
    root /var/www/html/current;
    index index.html;
    
    location / {
        try_files $uri $uri/ /index.html;
    }
}
```

### 4. Como Funciona

1. **Push para main** → Trigger automático
2. **Build do projeto** → `npm run build`
3. **Upload para VPS** → Via SSH/SCP
4. **Backup + Deploy** → Zero downtime
5. **Reload Nginx** → Site atualizado

### 5. Monitoramento

- **GitHub Actions**: Ver logs em `/actions`
- **Deploy Status**: Badge automático no README
- **Rollback**: Pasta `backup/` para reverter

### 6. Comandos Úteis na VPS

```bash
# Ver logs do nginx
tail -f /var/log/nginx/error.log

# Reverter para backup
cd /var/www/html
mv current current_failed
mv backup current
systemctl reload nginx

# Verificar espaço
df -h
du -sh current/ backup/
```

## ✅ Checklist Pós-Configuração

- [ ] Secrets configurados no GitHub
- [ ] Nginx configurado na VPS
- [ ] Pasta `/var/www/html/` criada
- [ ] Primeiro deploy manual testado
- [ ] SSL configurado (certbot)
- [ ] Domínio apontando para VPS

## 🔄 Workflow

```
git add .
git commit -m "feat: nova funcionalidade"
git push origin main
```

**⏱️ Em ~2-3 minutos seu site estará atualizado automaticamente!** 