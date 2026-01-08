(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([
  'object' == typeof document ? document.currentScript : void 0,
  84869,
  (A) => {
    A.v('/_next/static/media/Iconarchive-Fairy-Tale-Dark-Moon.512.c532b774.png');
  },
  58470,
  (A) => {
    A.v('/_next/static/media/play-icon.4ccf73a8.png');
  },
  69070,
  (A) => {
    A.v('/_next/static/media/pause-icon.9958116d.png');
  },
  34165,
  (A) => {
    A.v('/_next/static/media/skip-.0795c16c.png');
  },
  30409,
  (A) => {
    A.v('/_next/static/media/return-icon.89f06fc0.png');
  },
  48985,
  (A) => {
    'use strict';
    var a = A.i(43476),
      e = A.i(71645);
    let t = {
        src: A.i(84869).default,
        width: 512,
        height: 512,
        blurWidth: 8,
        blurHeight: 8,
        blurDataURL:
          'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAICAYAAADED76LAAABE0lEQVR42gEIAff+AAAAAAEHBwgwGBgcpCIjKuMlJy7lGhsgpQcHCS8AAAABAAcICS8hISjMLjA4/i0yPP8xOEL/Q0xT/igrMcoICQotABwgJ6EsNUD+OkRP/0BLVv8vO0j/T1xk/2JscP4lKCyfACg4RN4vRFL/MUlX/zRMWv81S1j/UWFp/5Wcmv9MT1LdAC1HVN01VmX/Nlpp/zxdav9EYGz/coGE/7m3rf9nZmPcACQ8Rp88ZnX9Q257/01yfv9jfYX/uLiv/7qxpf9XU02lAAsTFSs6XWfBWIWR/GOKlP9qgIX/e359/kNFSNcbGhpUAAAAAAEPFBYkNExSmjFRXOIXMD7jER8opgcKDDMAAAAC5EhjaFfUfacAAAAASUVORK5CYII=',
      },
      r = {
        src: A.i(58470).default,
        width: 512,
        height: 512,
        blurWidth: 8,
        blurHeight: 8,
        blurDataURL:
          'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAICAYAAADED76LAAAAUElEQVR42oWPuw3AIAxEyRaeJX2abMR67MEKFJQ0cMATJUZ6wrrzN4T9HmHiA0M75iuSqJDQVpIhNJH5O9r0VstZVcQvInHF8xPcEe6S1zMHd1QeV7r79qYAAAAASUVORK5CYII=',
      },
      i = {
        src: A.i(69070).default,
        width: 512,
        height: 512,
        blurWidth: 8,
        blurHeight: 8,
        blurDataURL:
          'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAICAYAAADED76LAAAAY0lEQVR42oWPqw2AQBBEJ4eDhJ/AIAkdkIDFYJAUQg1URgF0QCFYLu/UuhWT7L6Z7EfbuYfpWNamb++QhQ9Rw/BEkdfFK+m3guGJNKDsqscKljxG0gzzeFnBkucG3BXukd6bEaBaP7X7+WdnAAAAAElFTkSuQmCC',
      },
      c = {
        src: A.i(34165).default,
        width: 512,
        height: 512,
        blurWidth: 8,
        blurHeight: 8,
        blurDataURL:
          'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAICAYAAADED76LAAAAWElEQVR42oXPyw2AIBCEYWIrW44FUIIlaQ8m9rIlWIAXTx79gQkHQoDku8wOrxDKWmCIYsrqcIXjE1eWS6bgwYtbXLN8ZNp1YcOOU1nsFY62ML1i+sjhN3/yux9G3eTXHgAAAABJRU5ErkJggg==',
      },
      l = {
        src: A.i(30409).default,
        width: 512,
        height: 512,
        blurWidth: 8,
        blurHeight: 8,
        blurDataURL:
          'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAICAYAAADED76LAAAAUklEQVR42o3PwQ0AEAwFULFKxzGAEaxkB4ldjGAAFydHHz+OSvIuv0VrzDkWBDwJs1t0UGBQYbabhEGlDo3Zqu0n160EEQJkZv6rQf1CHfK55gTy5B9HgtZrnwAAAABJRU5ErkJggg==',
      };
    function s() {
      let [A, s] = (0, e.useState)(() => {
          try {
            return JSON.parse(localStorage.getItem('playlist') || '[]');
          } catch (A) {
            return [];
          }
        }),
        [n, g] = (0, e.useState)(0),
        [u, o] = (0, e.useState)(!1),
        d = (0, e.useRef)(null);
      return (
        (0, e.useEffect)(() => {
          localStorage.setItem('playlist', JSON.stringify(A));
        }, [A]),
        (0, e.useEffect)(() => {
          if (d.current) {
            if (!A[n]) {
              d.current.src = '';
              return;
            }
            ((d.current.src = A[n].url), u && d.current.play());
          }
        }, [n, A, u]),
        (0, a.jsxs)('main', {
          className: 'app-root',
          children: [
            (0, a.jsxs)('div', {
              className: 'app-container',
              children: [
                (0, a.jsx)('img', { src: t.src, alt: 'logo', className: 'logo' }),
                (0, a.jsx)('div', {
                  className: 'player-card',
                  children:
                    0 === A.length
                      ? (0, a.jsx)('div', {
                          className: 'empty-message',
                          children:
                            'Nenhuma música carregada. Use o botão de arquivo para adicionar músicas.',
                        })
                      : (0, a.jsx)('ol', {
                          className: 'playlist',
                          children: A.map((A, e) =>
                            (0, a.jsx)(
                              'li',
                              {
                                className: `playlist-item ${e === n ? 'current' : ''}`,
                                children: A.name,
                              },
                              A.id
                            )
                          ),
                        }),
                }),
              ],
            }),
            (0, a.jsx)('div', {
              className: 'file-input-wrapper',
              children: (0, a.jsx)('input', {
                id: 'musicas',
                type: 'file',
                multiple: !0,
                accept: 'audio/*',
                onChange: (A) => {
                  let a = Array.from(A.target.files || []);
                  if (0 === a.length) return;
                  let e = a.map((A) => ({
                    id: crypto.randomUUID(),
                    name: A.name,
                    url: URL.createObjectURL(A),
                  }));
                  s((A) => {
                    let a = [...A, ...e];
                    return (0 === A.length && a.length > 0 && g(0), a);
                  });
                },
                className: 'file-input',
              }),
            }),
            (0, a.jsxs)('div', {
              className: 'controls-bar',
              children: [
                (0, a.jsx)('button', {
                  onClick: () => {
                    (o(!1), g((A) => Math.max(0, A - 1)));
                  },
                  className: 'control-btn',
                  children: (0, a.jsx)('img', { src: l.src, alt: 'prev', className: 'icon-img' }),
                }),
                u
                  ? (0, a.jsx)('button', {
                      onClick: () => {
                        d.current && (d.current.pause(), o(!1));
                      },
                      className: 'control-btn',
                      children: (0, a.jsx)('img', {
                        src: i.src,
                        alt: 'pause',
                        className: 'icon-img',
                      }),
                    })
                  : (0, a.jsx)('button', {
                      onClick: () => {
                        if (d.current && 0 !== A.length) {
                          d.current.src || ((d.current.src = A[0].url), g(0));
                          try {
                            (d.current.play(), o(!0));
                          } catch (A) {
                            (console.error('Audio play failed:', A), o(!1));
                          }
                        }
                      },
                      className: 'control-btn',
                      children: (0, a.jsx)('img', {
                        src: r.src,
                        alt: 'play',
                        className: 'icon-img',
                      }),
                    }),
                (0, a.jsx)('button', {
                  onClick: () => {
                    (o(!1), g((a) => Math.min(A.length - 1, a + 1)));
                  },
                  className: 'control-btn',
                  children: (0, a.jsx)('img', { src: c.src, alt: 'next', className: 'icon-img' }),
                }),
              ],
            }),
            (0, a.jsx)('audio', { ref: d, id: 'audio-player' }),
          ],
        })
      );
    }
    A.s(['default', () => s], 48985);
  },
]);
