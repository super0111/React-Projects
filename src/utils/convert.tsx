import BigNumber from "bignumber.js/bignumber.js";
import { ONE_DAY_IN_SECONDS } from "./const";

function padTo2Digits(num: number) {
  return num.toString().padStart(2, "0");
}

function formatDate(date: Date) {
  return [date.toLocaleString("default", { month: "long" }), padTo2Digits(date.getDate()), date.getFullYear()].join(" ");
}

export const convertTimestampToDate = (ts: number) => {
  const date = new Date(ts);
  return formatDate(date);
};

export const convertWeiToEgld = (v: any, decimal = 18, precision = 2) => {
  if (typeof v !== typeof BigNumber) {
    v = new BigNumber(v);
  }
  const factor = Math.pow(10, precision);
  const number = v.div(Math.pow(10, decimal)).toNumber();
  return Math.floor(number * factor) / factor;
};

export const convertUndefinedToZero = (v: any) => {
  return v ? v : 0;
};

export const calculatePercentage = (dividend: any, divisor: any) => {
  return (convertUndefinedToZero(dividend) / convertUndefinedToZero(divisor)) * 100;
};

export const paddingTwoDigits = (num: any) => {
  return num.toLocaleString("en-US", {
    minimumIntegerDigits: 2,
    useGrouping: false,
  });
};

export const precisionRound = (number: number, precision = 4) => {
  const factor = Math.pow(10, precision);
  return Math.round(number * factor) / factor;
};

export const getDaysFromNow = (targetTimestamp: number) => {
  const ts = targetTimestamp - new Date().getTime();
  return Math.round(ts / ONE_DAY_IN_SECONDS);
};

export const getTxTimes = (txTime: number) => {

  let delta = (Date.now() - txTime) / 1000;
  let years = 0;
  let weeks = 0;
  const months = Math.floor(delta / 2592000);
  if(months < 1) {
    weeks = Math.floor(delta / 604800);
  }
  if(months >= 12) {
    years = Math.floor(months / 12);
  }
  delta -= months * 2592000;
  const days = Math.floor(delta / 86400);
  delta -= days * 86400;
  const hours = Math.floor(delta / 3600) % 24;
  delta -= hours * 3600;
  const minutes = Math.floor(delta / 60) % 60;

  if (years > 0) {
    let txt = ' years';
    if (years > 1) txt = ' year'; 
    return Math.floor(years) + txt;
  } else if (months > 0) {
    let txt = ' month';
    if (months > 1) txt = ' months'; 
    return Math.floor(months) + txt;
  } else if (weeks > 0) {
    let txt = ' week';
    if (weeks > 1) txt = ' weeks'; 
    return Math.floor(weeks) + txt;
  } else if (days > 0) {
    let txt = ' day';
    if (days > 1) txt = ' days'; 
    return Math.floor(days) + txt;
  } else if (hours > 0) {
    let txt = ' hour';
    if (hours > 1) txt = ' hours'; 
    return Math.floor(hours) + txt;
  } else {
    let txt = ' minute';
    if (minutes > 1) txt = ' minutes'; 
    return Math.floor(minutes) + txt;
  }
};