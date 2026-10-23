
import { test, describe } from 'node:test'
import { equal } from 'node:assert'


import { DescentClaimDataSDK } from '..'


describe('exists', async () => {

  test('test-mode', () => {
    const testsdk = DescentClaimDataSDK.test()
    equal(testsdk instanceof DescentClaimDataSDK, true,
      'DescentClaimDataSDK.test() must return a client synchronously')
  })

})
