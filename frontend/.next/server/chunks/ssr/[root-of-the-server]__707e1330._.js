module.exports = [
  18622,
  (a, b, c) => {
    b.exports = a.x('next/dist/compiled/next-server/app-page-turbo.runtime.prod.js', () =>
      require('next/dist/compiled/next-server/app-page-turbo.runtime.prod.js')
    );
  },
  42602,
  (a, b, c) => {
    'use strict';
    b.exports = a.r(18622);
  },
  87924,
  (a, b, c) => {
    'use strict';
    b.exports = a.r(42602).vendored['react-ssr'].ReactJsxRuntime;
  },
  72131,
  (a, b, c) => {
    'use strict';
    b.exports = a.r(42602).vendored['react-ssr'].React;
  },
  84869,
  (a) => {
    a.v('/_next/static/media/Iconarchive-Fairy-Tale-Dark-Moon.512.c532b774.png');
  },
  58470,
  (a) => {
    a.v('/_next/static/media/play-icon.4ccf73a8.png');
  },
  69070,
  (a) => {
    a.v('/_next/static/media/pause-icon.9958116d.png');
  },
  34165,
  (a) => {
    a.v('/_next/static/media/skip-.0795c16c.png');
  },
  30409,
  (a) => {
    a.v('/_next/static/media/return-icon.89f06fc0.png');
  },
  54502,
  (a) => {
    'use strict';
    var b = a.i(87924),
      c = a.i(72131);
    let d = {
        src: a.i(84869).default,
        width: 512,
        height: 512,
        blurWidth: 8,
        blurHeight: 8,
        blurDataURL:
          'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAICAYAAADED76LAAABE0lEQVR42gEIAff+AAAAAAEHBwgwGBgcpCIjKuMlJy7lGhsgpQcHCS8AAAABAAcICS8hISjMLjA4/i0yPP8xOEL/Q0xT/igrMcoICQotABwgJ6EsNUD+OkRP/0BLVv8vO0j/T1xk/2JscP4lKCyfACg4RN4vRFL/MUlX/zRMWv81S1j/UWFp/5Wcmv9MT1LdAC1HVN01VmX/Nlpp/zxdav9EYGz/coGE/7m3rf9nZmPcACQ8Rp88ZnX9Q257/01yfv9jfYX/uLiv/7qxpf9XU02lAAsTFSs6XWfBWIWR/GOKlP9qgIX/e359/kNFSNcbGhpUAAAAAAEPFBYkNExSmjFRXOIXMD7jER8opgcKDDMAAAAC5EhjaFfUfacAAAAASUVORK5CYII=',
      },
      e = {
        src: a.i(58470).default,
        width: 512,
        height: 512,
        blurWidth: 8,
        blurHeight: 8,
        blurDataURL:
          'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAICAYAAADED76LAAAAUElEQVR42oWPuw3AIAxEyRaeJX2abMR67MEKFJQ0cMATJUZ6wrrzN4T9HmHiA0M75iuSqJDQVpIhNJH5O9r0VstZVcQvInHF8xPcEe6S1zMHd1QeV7r79qYAAAAASUVORK5CYII=',
      },
      f = {
        src: a.i(69070).default,
        width: 512,
        height: 512,
        blurWidth: 8,
        blurHeight: 8,
        blurDataURL:
          'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAICAYAAADED76LAAAAY0lEQVR42oWPqw2AQBBEJ4eDhJ/AIAkdkIDFYJAUQg1URgF0QCFYLu/UuhWT7L6Z7EfbuYfpWNamb++QhQ9Rw/BEkdfFK+m3guGJNKDsqscKljxG0gzzeFnBkucG3BXukd6bEaBaP7X7+WdnAAAAAElFTkSuQmCC',
      },
      g = {
        src: a.i(34165).default,
        width: 512,
        height: 512,
        blurWidth: 8,
        blurHeight: 8,
        blurDataURL:
          'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAICAYAAADED76LAAAAWElEQVR42oXPyw2AIBCEYWIrW44FUIIlaQ8m9rIlWIAXTx79gQkHQoDku8wOrxDKWmCIYsrqcIXjE1eWS6bgwYtbXLN8ZNp1YcOOU1nsFY62ML1i+sjhN3/yux9G3eTXHgAAAABJRU5ErkJggg==',
      },
      h = {
        src: a.i(30409).default,
        width: 512,
        height: 512,
        blurWidth: 8,
        blurHeight: 8,
        blurDataURL:
          'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAICAYAAADED76LAAAAUklEQVR42o3PwQ0AEAwFULFKxzGAEaxkB4ldjGAAFydHHz+OSvIuv0VrzDkWBDwJs1t0UGBQYbabhEGlDo3Zqu0n160EEQJkZv6rQf1CHfK55gTy5B9HgtZrnwAAAABJRU5ErkJggg==',
      };
    function i() {
      let [a, i] = (0, c.useState)(() => {
          try {
            return JSON.parse(localStorage.getItem('playlist') || '[]');
          } catch (a) {
            return [];
          }
        }),
        [j, k] = (0, c.useState)(0),
        [l, m] = (0, c.useState)(!1),
        n = (0, c.useRef)(null);
      return (
        (0, c.useEffect)(() => {
          localStorage.setItem('playlist', JSON.stringify(a));
        }, [a]),
        (0, c.useEffect)(() => {
          if (n.current) {
            if (!a[j]) {
              n.current.src = '';
              return;
            }
            ((n.current.src = a[j].url), l && n.current.play());
          }
        }, [j, a, l]),
        (0, b.jsxs)('main', {
          className: 'app-root',
          children: [
            (0, b.jsxs)('div', {
              className: 'app-container',
              children: [
                (0, b.jsx)('img', { src: d.src, alt: 'logo', className: 'logo' }),
                (0, b.jsx)('div', {
                  className: 'player-card',
                  children:
                    0 === a.length
                      ? (0, b.jsx)('div', {
                          className: 'empty-message',
                          children:
                            'Nenhuma música carregada. Use o botão de arquivo para adicionar músicas.',
                        })
                      : (0, b.jsx)('ol', {
                          className: 'playlist',
                          children: a.map((a, c) =>
                            (0, b.jsx)(
                              'li',
                              {
                                className: `playlist-item ${c === j ? 'current' : ''}`,
                                children: a.name,
                              },
                              a.id
                            )
                          ),
                        }),
                }),
              ],
            }),
            (0, b.jsx)('div', {
              className: 'file-input-wrapper',
              children: (0, b.jsx)('input', {
                id: 'musicas',
                type: 'file',
                multiple: !0,
                accept: 'audio/*',
                onChange: (a) => {
                  let b = Array.from(a.target.files || []);
                  if (0 === b.length) return;
                  let c = b.map((a) => ({
                    id: crypto.randomUUID(),
                    name: a.name,
                    url: URL.createObjectURL(a),
                  }));
                  i((a) => {
                    let b = [...a, ...c];
                    return (0 === a.length && b.length > 0 && k(0), b);
                  });
                },
                className: 'file-input',
              }),
            }),
            (0, b.jsxs)('div', {
              className: 'controls-bar',
              children: [
                (0, b.jsx)('button', {
                  onClick: () => {
                    (m(!1), k((a) => Math.max(0, a - 1)));
                  },
                  className: 'control-btn',
                  children: (0, b.jsx)('img', { src: h.src, alt: 'prev', className: 'icon-img' }),
                }),
                l
                  ? (0, b.jsx)('button', {
                      onClick: () => {
                        n.current && (n.current.pause(), m(!1));
                      },
                      className: 'control-btn',
                      children: (0, b.jsx)('img', {
                        src: f.src,
                        alt: 'pause',
                        className: 'icon-img',
                      }),
                    })
                  : (0, b.jsx)('button', {
                      onClick: () => {
                        if (n.current && 0 !== a.length) {
                          n.current.src || ((n.current.src = a[0].url), k(0));
                          try {
                            (n.current.play(), m(!0));
                          } catch (a) {
                            (console.error('Audio play failed:', a), m(!1));
                          }
                        }
                      },
                      className: 'control-btn',
                      children: (0, b.jsx)('img', {
                        src: e.src,
                        alt: 'play',
                        className: 'icon-img',
                      }),
                    }),
                (0, b.jsx)('button', {
                  onClick: () => {
                    (m(!1), k((b) => Math.min(a.length - 1, b + 1)));
                  },
                  className: 'control-btn',
                  children: (0, b.jsx)('img', { src: g.src, alt: 'next', className: 'icon-img' }),
                }),
              ],
            }),
            (0, b.jsx)('audio', { ref: n, id: 'audio-player' }),
          ],
        })
      );
    }
    a.s(['default', () => i], 54502);
  },
];

//# sourceMappingURL=%5Broot-of-the-server%5D__707e1330._.js.map
