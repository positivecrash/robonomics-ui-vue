# Релиз 1.0.1

## Публикация в npm

Из корня репозитория robonomics-ui-vue:

```bash
# Сборка скопирует package.json (version 1.0.1) в dist, затем публикация из dist
npm run publish:package
```

Требуется авторизация в npm (`npm login`). При первом публикации пакета может понадобиться `npm publish --access public`, если пакет не scope.

## Публикация на GitHub

```bash
git add -A
git commit -m "chore: release 1.0.1"
git tag v1.0.1
git push origin main
git push origin v1.0.1
```

(Замените `main` на имя вашей ветки по умолчанию.)

## Обновление в приложении

В robonomics-app зависимость уже указана как `"robonomics-ui-vue": "^1.0.1"`. После публикации пакета в npm:

```bash
cd robonomics-app
npm install
```

Либо явно: `npm install robonomics-ui-vue@1.0.1`.
