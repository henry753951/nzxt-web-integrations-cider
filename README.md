# NZXT web integrations cider

The current versoin is designed for compatibility with the karken **NON**-Elite series. (KR360RGB...)

Web integrations with NowPlaying for the NZXT Kraken series.
- Show your Kraken and PC status on LCD.
- Now playing widget on LCD.
- Auto change state to Now Playing when music is playing.

Supports the following Muisc Players:
- Cider 2

# Usage
Copy the url below and paste it into the **"custom web integration"** field in the NZXT CAM software.
```
https://henry753951.github.io/nzxt-web-integrations-cider/
```

You can also configure this integration by **"Configure"** button.

![image](https://github.com/henry753951/nzxt-web-integrations-cider/assets/31657781/0a16c064-a998-448c-8844-7222d93fbba5)
![image](https://github.com/henry753951/nzxt-web-integrations-cider/assets/31657781/92779126-b2b7-4867-8bf4-a122de5ac765)


# Build by yourself

```bash
git clone https://github.com/henry753951/nzxt-web-integrations-cider.git
```

```bash
cd nzxt-web-integrations-cider
```

```bash
pnpm install
```
### build

```bash
pnpm run build
```
### Development

```bash
pnpm run dev
```

base path is `http://<hostname>/nzxt-web-integrations-cider/`
