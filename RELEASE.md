# Релиз 1.0.3

## Публикация в npm

Из корня репозитория robonomics-ui-vue (версия в package.json должна быть уже 1.0.3):

```bash
# Сборка скопирует package.json в dist, затем публикация из dist
npm run publish:package
```

Требуется авторизация в npm (`npm login`). При первом публикации пакета может понадобиться `npm publish --access public`, если пакет не scope.

## Публикация на GitHub

```bash
git add -A
git commit -m "chore: release 1.0.3"
git tag v1.0.3
git push origin main
git push origin v1.0.3
```

(Замените `main` на имя вашей ветки по умолчанию.)

## Обновление в приложении

В robonomics-app зависимость указана как `"robonomics-ui-vue": "^1.0.x"`. После публикации пакета в npm:

```bash
cd robonomics-app
npm install
```

Либо явно: `npm install robonomics-ui-vue@1.0.3`.
