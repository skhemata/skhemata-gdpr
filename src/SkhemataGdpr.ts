import { html, css, CSSResult, SkhemataBase, property  } from '@skhemata/skhemata-base';
import { translationEngDefault } from './translation/eng';

export class SkhemataGdpr extends SkhemataBase{

  @property({ type: Object })
  translationData = {
    eng: translationEngDefault,
  };

  @property({ type: Boolean })
  allowCookies = false;

  static get styles(): CSSResult[] {
    return <CSSResult[]>[
      ...super.styles,
      css`
        :host {
          position: fixed;
          bottom: 1em;
          left: 1em;
          transition: 0.5s all;
          z-index: 9999;
        }

        @media screen and (max-width: 475px){
          :host{
            right: 1em;
          }
        }
        .cookies-container {
          color: var(--skhemata-gdpr-color, rgb(64, 64, 64));
          background-color: var(--skhemtata-gdpr-background-color, rgb(239, 239, 239));
          padding: 1em;
          border-radius: 5px;
          max-width: 24em;
        }

        .button-container {
          margin-top: 1.5em;
          display: flex;
          justify-content: center;
        }

        .button.is-success {
          padding-top: 0;
          padding-bottom: 0;
        }

        p {
          line-height: 1.75em;
        }
      `,
    ];
  }

  constructor() {
    super();

    let cookie = document.cookie?.split('; ')?.find(row => row.startsWith('__skhemata_gdpr_allow_cookies='))?.split('=')[1];

    // Checks if the consent has been clicked before
    if(cookie === 'true') {
      this.allowCookies = true;
    }
  }

  // sets local storage cookie on click
  setCookie() {
    this.allowCookies = true;
    document.cookie = '__skhemata_gdpr_allow_cookies=true';
  }

  render() {
    let link = this.configData.link
    ? this.configData.link
    : false;
    return !this.allowCookies ? html`     
      <div class="cookies-container">
        <p>${this.getStr('SkhemataGdpr.gdprText')} ${ link ? html`<a href="${link}" target="_blank">${this.getStr('SkhemataGdpr.learnMore')}</a>`: ''}</p>
        <div class="button-container">
          <button class="button is-success" @click=${this.setCookie}>${this.getStr('SkhemataGdpr.gotIt')}</button>
        </div>
      </div>   
    ` : '';
  }
}
