// Copyright 2017-2021 @polkadot/app-staking authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { Balance } from '@maticnetwork/da-types/interfaces';

export interface NominatorValue {
  nominatorId: string;
  value: Balance;
}
