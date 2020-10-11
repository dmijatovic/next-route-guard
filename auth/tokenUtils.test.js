import {tokenValid, roleIncluded} from './tokenUtils'

// mock jwt_decode. It needs to return function
// that takes token
jest.mock('jwt-decode',() => token =>{
  // console.log("mocked_jwt_decode...token:", token)
  if (token==="RETURN_VALID_EXP"){
    return {
      //return time in seconds
      exp: (Date.now()/1000) + 61,
      roles:["test","admin","analyst"]
    }
  }else if (token==="THROW_ERROR"){
    throw new Error("Failed to decode token")
  }else if (token==="UNDEFINED"){
    return {}
  } else{
    return {
      exp: Date.now()/1000,
      roles:["test","admin","analyst"]
    }
  }
})

describe('tokenValid',()=>{
  it('returns true on exp in future (+61sec) ',()=>{
    expect(tokenValid("RETURN_VALID_EXP")).toBe(true)
  })

  it('return false when exp is current time',()=>{
    expect(tokenValid("INVALID_EXP")).toBe(false)
  })
  it('return false when jwt_decode throws error',()=>{
    expect(tokenValid("THROW_ERROR")).toBe(false)
  })
  it('return false when exp is undefined',()=>{
    expect(tokenValid("UNDEFINED")).toBe(false)
  })
})

describe('roleIncluded',()=>{
  it('returns false on undefined roles in token',()=>{
    expect(roleIncluded("UNDEFINED","")).toBe(false)
  })
  it('returns false on empty string',()=>{
    expect(roleIncluded("INVALID","")).toBe(false)
  })
  it('returns false on empty array',()=>{
    expect(roleIncluded("INVALID",[])).toBe(false)
  })

  it('returns false on incorrect string role "analy"',()=>{
    expect(roleIncluded("INVALID","analy")).toBe(false)
  })

  it('returns false on incorrect array role ["analy"]',()=>{
    expect(roleIncluded("INVALID",["analy"])).toBe(false)
  })

  it('returns true on correct string role "admin"',()=>{
    expect(roleIncluded("INVALID","admin")).toBe(true)
  })

  it('returns true on correct array role ["admin"]',()=>{
    expect(roleIncluded("INVALID",["admin"])).toBe(true)
  })

  it('returns true when one of roles match ["admin",""]',()=>{
    expect(roleIncluded("INVALID",["admin",""])).toBe(true)
  })

  it('returns true when multiple roles match ["admin","analyst"]',()=>{
    expect(roleIncluded("INVALID",["admin","analyst"])).toBe(true)
  })

  it('returns true when all roles match ["admin","analyst","test"]',()=>{
    expect(roleIncluded("INVALID",["admin","analyst","test"])).toBe(true)
  })

  it('returns false when none of roles match ["admi","analy","tests"]',()=>{
    expect(roleIncluded("INVALID",["admi","analy","tests"])).toBe(false)
  })

  it('returns false when single role dont match ["tests"]',()=>{
    expect(roleIncluded("INVALID",["tests"])).toBe(false)
  })

})