'use server'
import { connectToSalesforce } from '@/lib/salesforce'

export const getAccounts = async () => {
  const conn = await connectToSalesforce()
  const accounts = await conn.query('SELECT Id, Name FROM Account')
  return accounts
}

export const createOrUpdateAccount = async (
  name: string,
  phone?: string,
  email?: string,
) => {
  const account = await getAccountByPhoneOrEmail(phone, email)

  if (account) {
    return account
  }

  const conn = await connectToSalesforce()
  const newAccount = {
    Name: name,
    Phone__c: phone,
    Email__c: email,
  }

  const result = await conn.sobject('Account').create(newAccount)
  return result
}

export const getAccountByPhoneOrEmail = async (
  phone?: string,
  email?: string,
) => {
  const conn = await connectToSalesforce()
  const query: {
    Phone__c?: string
    Email__c?: string
  } = {}
  if (phone) {
    query['Phone__c'] = phone
  }
  if (email) {
    query['Email__c'] = email
  }
  const account = await conn.sobject('Account').findOne(query)
  return account
}

export const getAccountById = async (id: string) => {
  const conn = await connectToSalesforce()
  const account = await conn.sobject('Account').retrieve(id)
  return account
}
