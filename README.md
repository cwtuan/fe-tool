# fe-tool

### Pages
- http://localhost:8000/#/fe/QrCode

### Use by docker

```bash
# preview
$ docker pull antdesign/ant-design-pro
$ docker run -p 80:80 antdesign/ant-design-pro
# open http://localhost

# dev
$ npm run docker:dev

# build
$ npm run docker:build


# production dev
$ npm run docker-prod:dev

# production build
$ npm run docker-prod:build
```

### Deploy
- `npm run build`
- `open .`
- copy all files in `dist` to CyberDuck's `/home/tonytuan/public_html/tool`
- `open http://tool.tonytuan.org`

