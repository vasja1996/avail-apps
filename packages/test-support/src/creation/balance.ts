// Copyright 2017-2021 @polkadot/app-bounties authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { Balance } from '@maticnetwork/da-types/interfaces';

import BN from 'bn.js';

import { TypeRegistry } from '@maticnetwork/da-types/create';

export function balanceOf (number: number): Balance {
  return new TypeRegistry().createType('Balance', new BN(number));
}
