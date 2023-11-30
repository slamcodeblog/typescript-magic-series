type User = {
    login: string,
    email: string,
    dateOfBirth?: Date,
    lastLoginDate?: Date
}

type Customer = {
    email: string,
    firstName: string,
    lastName: string
}

// union of types - properties from both types
type CustomerUser = Customer & User

// union of types keys
type CustomerUserKey = keyof Customer | keyof User

const cuser: CustomerUser = {
    email: "skdjsdkj@skdj.com",
    login: "sldklskd",
    firstName: "Lacey",
    lastName: "Kaycey"
}

const CUKey: CustomerUserKey = "login";

// sets of keys can be intersected by '&' operator
// this resutls in only shared keys to be assigned to new type
type CustomerUserCommonKey = keyof Customer & keyof User;

// has email only
type CustomerUserIdentifier = {
    [key in keyof Customer & keyof User]: (Customer & User)[key] 
}

type UserKey = keyof User // 'login' | 'email' | 'dateOfBirth'

// remove shared properties form 'Customer' type
// iterate over all Customer keys and remove the ones shared by both types
// by applying condition to them and returnign never if it is met
type CustomerNotUser = {
    [key in keyof Customer as (key extends (keyof Customer & keyof User) ? never : key)]: Customer[key] 
}