/* eslint-disable unicorn/better-regex */
import { Decimal } from 'decimal.js';

import { config } from '@/config';

import { APP_ENV } from '../constants';
import { getRandomNumber } from './algorithm';

export const randomSpecialChar = (): string => {
  const specialCharacters = '(@$!%()*#?&^<>)!';
  const index = Math.floor((specialCharacters.length - 1) * Math.random());

  return specialCharacters.slice(index, index + 1);
};

export const generateVerifyCode = (): string => getRandomNumber(4);

export const addPrefixPhoneNumber = (number: string): string => {
  return config.app.env === APP_ENV.DEV || config.app.env === APP_ENV.TEST
    ? `+84${number}`
    : `+1${number}`;
};

export const splitPrefixCanadaPhoneNumber = (number: string): string => {
  const prefix = '+1';
  return number.split(prefix)[1];
};

export const placeholdersFromStringArray = (stringArray: string[]): string => {
  return stringArray.map((string) => `'${string}'`).join(', ');
};

export function formatRoleToRoleRequest(role: string): string {
  const words = role.split(' ');

  if (words.length > 1) {
    return words.join('-');
  }

  return role;
}

export function formatRoleRequestToRole(role: string): string {
  if (role.includes('-')) {
    return role.replaceAll('-', ' ');
  }

  return role;
}

export function getClientFullName(firstName: string, lastName: string): string {
  return firstName + ' ' + lastName;
}

export function replacePlaceholders(
  template: string,
  data: Record<string, string>,
): string {
  return template.replaceAll(
    /\[([^\]]+)]/g,
    (_, key) => data[key.trim()] || '',
  );
}

export function checkTheSameItemsInTwoArray(
  firstArray: string[],
  secondArray: string[],
): boolean {
  return (
    firstArray.length === secondArray.length &&
    [...firstArray]
      .sort()
      .every((value, index) => value === [...secondArray].sort()[index])
  );
}

export function splitInAppContent(inAppContent: string): {
  content: string;
  title: string;
} {
  const matches = [...inAppContent.matchAll(/<p>(.*?)<\/p>/g)];

  const title = matches[0]?.[1].trim() ?? '';
  const message = matches[1]?.[1].trim() ?? '';
  return {
    content: message,
    title,
  };
}
export function getSmsContent(smsContentConfig: string): string {
  const match = smsContentConfig.match(/<p>(.*?)<\/p>/);
  const content: string | null = match ? match[1].trim() : '';
  return content;
}

export function replaceHtmlPlaceholders(
  template: string,
  data: Record<string, string>,
): string {
  let result = template;
  // Replace [Key] style
  result = result.replaceAll(
    /\[([^\]]+)]/g,
    (_, key) => data[`[${key}]`] || '',
  );

  // Replace &lt;...&gt; including spaces
  result = result.replaceAll(/(&lt;.*?&gt;)/g, (match) => data[match] || '');

  // Replace {...} style
  result = result.replaceAll(
    /\{([^}]+)\}/g,
    (_, key) => data[`{${key}}`] || '',
  );

  return result;
}

export function replaceHtmlPlaceHoldersWithNoTitle(
  template: string,
  data: Record<string, string>,
): string {
  let result = template;

  // Replace [Key] style
  result = result.replaceAll(
    /\[([^\]]+)]/g,
    (_, key) => data[`[${key}]`] || '',
  );

  // Replace {...} style
  result = result.replaceAll(
    /\{([^}]+)\}/g,
    (_, key) => data[`{${key}}`] || '',
  );

  // Strip ALL HTML tags (<p>, <div>, etc)
  result = result.replaceAll(/<[^>]+>/g, '');

  return result.trim();
}

export function getProcessedChequeKey(currentDate: string) {
  return `${currentDate}-processed-cheque`;
}
export function getSeqId(seqId: number): string {
  return String(seqId).padStart(6, '0');
}

export function formatMoney(amount: number): string {
  return new Decimal(amount).toNumber().toLocaleString('en-US', {
    maximumFractionDigits: 2,
    minimumFractionDigits: 2,
  });
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function getEnumKeyByValue<T extends Record<any, any>>(
  enumObject: T,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  value: any,
): keyof T | undefined {
  return (Object.keys(enumObject) as Array<keyof T>).find(
    (key) => enumObject[key] === value,
  );
}

export function toLowerCase(input: string): string {
  return input.toLowerCase();
}

export function toUpperCase(input: string): string {
  return input.toUpperCase();
}
