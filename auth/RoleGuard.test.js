
import { render, screen } from "@testing-library/react";
import { RoleBasedContent } from './RoleGuard'

jest.mock("./RouteGuard",()=>{
  console.log("RouteGuard...mock")
  return{
    useAuthContext:()=>({
      user:{
        accessToken:"FAKE_TOKEN"
      }
    })
  }
})

const utils = jest.mock("./tokenUtils",()=>{
  console.log("tokenUtils...mock")
  return{
    tokenValid:(token)=>{
     return true
    },
    roleIncluded:(token,roles)=>{
      return true
    }
  }
})

describe("RoleBasedContent",()=>{
  it.only("renders content",()=>{
    utils.tokenValid = jest.fn()
    render(
      <RoleBasedContent allowedRoles={["user"]}>
        <h1>Content</h1>
      </RoleBasedContent>
    )
    screen.debug()
    // expect(utils.tokenValid).toBeCalledTimes(1)
  })

})