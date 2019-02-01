import { Injectable } from '@angular/core';
import { ConfigProviderService } from './config-provider.service';

@Injectable({
  providedIn: 'root'
})
export class UrlProviderService {
  constructor(private configProvider: ConfigProviderService) { }
  get culture_init() { return this.getUrl("culture/", "{0}.json", true); }

  private _authenticationBase = "Account/";
  get authentication_signIn() { return this.getUrl(this._authenticationBase, "signin"); }
  get authentication_continueSession() { return this.getUrl(this._authenticationBase, "continuesession"); }
  get authentication_ping() { return this.getUrl(this._authenticationBase, "ping"); }
  get authentication_signout() { return this.getUrl(this._authenticationBase, "signout"); }
  get authentication_generateToken() { return this.getUrl(this._authenticationBase, "GenerateToken"); }
  get authentication_theme() { return this.getUrl(this._authenticationBase, "theme"); }

  private _accountBase = this._authenticationBase;
  get account_overview() { return this.getUrl(this._accountBase, "overview"); }
  get account_details() { return this.getUrl(this._accountBase, "details"); }
  get account_yearStat() { return this.getUrl(this._accountBase, "yearstat/{0}"); }
  get account_monthStat() { return this.getUrl(this._accountBase, "monthstat/{0}/{1}"); }

  private _databaseBase = "Manage/Database";
  get databases_base() { return this.getUrl(this._databaseBase, ""); }

  private _tableBase = "Manage/Table";
  get table_base() { return this.getUrl(this._tableBase, "{0}"); }
  get table_fullyQualified() { return this.getUrl(this._tableBase, "{0}/{1}"); };

  private _columnBase = "Manage/Column";
  get column_base() { return this.getUrl(this._columnBase, "{0}/{1}"); }

  private _dataAccessInternalBase = "data/";
  private _dataAccessExternalBase = "endpoint/";
  get dataAccess_base() { return this.getUrl(this._dataAccessInternalBase, "{0}/{1}"); }
  get dataAccess_WithId() { return this.getUrl(this._dataAccessInternalBase, "{0}/{1}/{2}"); }
  get dataAccess_internalPart() { return this.joinUrl(this.configProvider.apiBaseUrl) + this._dataAccessInternalBase; }
  get dataAccess_externalPart() { return this._dataAccessExternalBase; }

  private _helpBase = "helpcontent/";
  get help_topic() { return this.getUrl(this._helpBase, "topic/{0}"); }
  get help_postmanCollection() { return this.getUrl(this._helpBase, "postmansample/{0}/{1}"); }


  private _paymentBase = "payments";
  get payment_verify() { return this.getUrl(this._paymentBase, "verify"); }
  get payment_getCurrencies() { return this.getUrl(this._paymentBase, "currencies"); }
  get payment_getSetCurrency() { return this.getUrl(this._paymentBase, "currency/{0}"); }
  get payment_convertAmount() { return this.getUrl(this._paymentBase, "convertamount"); }
  get payment_plans() { return this.getUrl(this._paymentBase, "plans/{0}"); }
  get payment_redeemCallCredit() { return this.getUrl(this._paymentBase, "redeemcallcredit"); }

  private getUrl(base: string, url: string, isApi = true): string {
    var result = (isApi ? this.joinUrl(this.configProvider.apiBaseUrl) : document.baseURI) +
      this.joinUrl(base) +
      this.joinUrl(url);

    return result.replace(new RegExp("/+$", "ig"), "");
  }

  public joinUrl(urlPart: string): string {
    if (urlPart === "" || urlPart === null) return "";

    return urlPart + ((urlPart && urlPart.trim() !== "" && urlPart.endsWith('/')) ? "" : "/");
  }

  public urlFormat(template: string, params: string[] = null) {
    var url = template;

    if (params)
      params.forEach((item, index) => {
        url = url.replace(`{${index}}`, item);
      });

    url = url.replace(/(\{\d+\}?\/)/, "");

    return url;
  }
}
