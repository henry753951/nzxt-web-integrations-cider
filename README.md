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

![image](https://github.com/henry753951/nzxt-web-integrations-cider/assets/31657781/488c7bd5-ff10-4614-8cee-00e3fc2e966c)

![image](https://github.com/henry753951/nzxt-web-integrations-cider/assets/31657781/12769af3-a320-4649-a7f1-6b48dbca6edb)

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
