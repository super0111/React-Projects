import { jsonQuery, query, getLocalToken, rawquery, formdataquery } from "./common";
import { restApiSettings } from "./api";

export const getMemberInfoFromLocal = () => {
  const token = getLocalToken();
  const userInfo = token ? token.member : null;
  return userInfo;
}

export async function apiGetBrands() {
  return await query(`/InfoAuto/Brands`);
}

export async function apiGetBrandDetailByName(searchParams) {
  return await query(`/InfoAuto/BrandByName`, { searchParams });
}

export async function apiGetGroupsByBrandName(searchParams) {
  return await query(`/InfoAuto/GroupsByBrandName`, { searchParams });
}

export async function apiGetModelsByBrandGroupYear(searchParams) {
  return await query(`/InfoAuto/ModelsByBrandGroupYear`, { searchParams });
}

export async function apiGetYearsByBrandId(searchParams) {
  return await query(`/InfoAuto/YearsByBrandId`, { searchParams });
}

export async function apiCheckPostalCode(data) {
  return await jsonQuery(`/Leads/PostalCodeExist?number=` + data, 'POST', {}, true);
}

export async function apiSearchCarInput(value) {
  return await rawquery(`/InfoAuto/Search?returntype=m&t=` + value);
}

export async function apiGetTeamMembers() {
  return await rawquery("/about-us", false);
}

export async function apiGetPressList() {
  return await rawquery("/press", false);
}

export async function apiPolicyCreate(data) {

  return fetch(restApiSettings.baseURL + "/Policies/Create", {
    method: "post",
    body: data
  });

}

export async function apiContact(data) {
  return await formdataquery(data, "/Contact/Contact");
}

export async function apiGetHomeData() {
  return await rawquery("/home", false);
}

export async function apiGetFAQs() {
  return await rawquery("/faqs", false);
}

export async function apiLeadsSignUp(data) {
  return await formdataquery(data, "/Leads/SignUpData");
}

export async function apiGetBestQuotationData(vehicleID, leadID) {
  return await rawquery("/Quotes/ByVehicle/" + vehicleID + "/" + leadID);
}

export async function apiGetQuotationData(vehicleID, leadID) {
  return await rawquery("/Quotes/ByVehicleAll/" + vehicleID + "/" + leadID);
}

export async function apiGetVehicleData(vehicleID) {
  return await rawquery("/Vehicles/" + vehicleID);
}

export async function apiHiringDataSend(data) {
  return await formdataquery(data, "/Customers/SignUp");
}

export async function apiHiringVehicleSend(data) {
  return await formdataquery(data, "/Vehicles/Update");
}

export async function apiHiringAllowedMethod(customerId, quoteId) {
  return await jsonQuery(`/Customers/AllowedPaymentMethod?CustomerId=` + customerId + "&quoteId=" + quoteId, 'POST', {}, true);
}

export async function apiHiringPaymentMethodCBUSend(data) {
  return await formdataquery(data, "/Customers/PaymentMethodCBU");
}

export async function apiHiringPaymentMethodCardSend(data) {
  return await formdataquery(data, "/Customers/PaymentMethodCard");
}

export async function apiHiringPictureSend(data) {
  return await formdataquery(data, "/Vehicles/UploadPictures");
}

export async function apiGetStates() {
  return await rawquery("/States/Get");
}

export async function apiGetPreLoadedData(leadID, vehicleID, quoteID) {
  return await rawquery("/Leads/GetDataToSignUp?LeadId=" + leadID + "&VehicleId=" + vehicleID + "&QuoteId=" + quoteID);
}

export async function apiLeadsCompleteFields(data) {
  return await formdataquery(data, "/Leads/CompleteFields");
}

export async function apiGetQuotationDataById(quoteID) {
  return await rawquery("/Quotes?id=" + quoteID);
}

export async function apiGetModelByCodia(code) {
  return await rawquery("/InfoAuto/ModelByCodia?codia=" + code);
}

export async function apiGetLeadData(leadID) {
  return await rawquery("/Leads/" + leadID);
}

export async function apiVehiclesUpdate(data) {
  return await formdataquery(data, "/Vehicles/Update");
}

export async function apiLeadsUpdate(data) {
  return await formdataquery(data, "/Leads/Update");
}

export async function apiCongrats(id) {
  return await rawquery("/companies-texts/?insuranceId=" + id, false);
}

export async function apiGetAutoQuestions() {
  return await rawquery("/faqs?type=car&_sort=order", false);
}
export async function apiGetBrandsMoto() {
  return await query(`/InfoAuto/Brands?type=m`);
}

export async function apiGetBrandDetailByNameMoto(searchParams) {
  return await query(`/InfoAuto/BrandByName?type=m`, { searchParams });
}

export async function apiGetGroupsByBrandNameMoto(searchParams) {
  return await query(`/InfoAuto/GroupsByBrandName?type=m`, { searchParams });
}

export async function apiGetModelsByBrandGroupYearMoto(searchParams) {
  return await query(`/InfoAuto/ModelsByBrandGroupYear?type=m`, { searchParams });
}

export async function apiGetYearsByBrandIdMoto(searchParams) {
  return await query(`/InfoAuto/YearsByBrandId?type=m`, { searchParams });
}

export async function apiSearchCarInputMoto(value) {
  return await query(`/InfoAuto/Search?type=m&returntype=v&t=` + value );
}

export async function apiGetModelByCodiaMoto(code) {
  return await rawquery("/InfoAuto/ModelByCodia?type=m&codia=" + code);
}

export async function apiGetMotoQuestions() {
  return await rawquery("/faqs?type=moto", false);
}

export async function apiGetOffersMoto() {
  return await rawquery("/offers?_sort=order&type=moto", false);
}

export async function apiGetHomeOffers() {
  return await rawquery("/offers?_sort=order&type=general", false);
}

export async function apiGetModelsByBrandNameYearMoto(searchParams) {
  return await query(`/InfoAuto/ModelsByBrandNameYear?type=m`, { searchParams });
}

export async function apiGetYearsByGroupId(searchParams) {
  return await query(`/InfoAuto/YearsByGroupId`, { searchParams });
}

export async function apiGetYearsByCodia(searchParams) {
  return await query(`/InfoAuto/YearsByCodia`, { searchParams });
}

export async function apiSignUp(data) {
  return await formdataquery(data, "/api/users/signUp");
}

export async function apiLogin(data) {
  return await formdataquery(data, "/api/auth/login");
}

export async function apiSendStakeRequest(data) {
  return await formdataquery(data, "/api/stake/sendRequest");
}
export async function apiSendUnstakeRequest(data) {
  return await formdataquery(data, "/api/stake/sendUnStakeRequest");
}
export async function apiSendUnstakeResponse(data) {
  return await formdataquery(data, "/api/stake/sendUnStakeResponse");
}
export async function apiSendUnstakeRejectResponse(data) {
  return await formdataquery(data, "/api/stake/sendUnStakeRejectResponse");
}

export async function apiGetStakedata() {
  return await rawquery("/api/stake/getStake");
}
export async function apiChangeStakeStatus(data) {
  return await formdataquery(data, "/api/stake/changeStatus");
}
export async function apiChangeNewFlagStatus(data) {
  return await formdataquery(data, "/api/stake/changeNewFlag");
}
export async function apiAdminLogin(data) {
  return await formdataquery(data, "/api/admin/login");
}
export async function apiGetStakeDataById(data) {
  return await formdataquery(data, "/api/stake/getById");
}