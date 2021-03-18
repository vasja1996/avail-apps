// Copyright 2017-2021 @polkadot/app-democracy authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { Compact, Option } from '@maticnetwork/da-types';
import type { ProposalIndex, TreasuryProposal } from '@maticnetwork/da-types/interfaces';
import type { TypeDef } from '@maticnetwork/da-types/types';

import React, { useEffect, useState } from 'react';

import { useApi, useCall } from '@polkadot/react-hooks';
import Params from '@polkadot/react-params';
import { getTypeDef } from '@maticnetwork/da-types/create';

interface Props {
  className?: string;
  value: Compact<ProposalIndex>;
}

interface Param {
  name: string;
  type: TypeDef;
}

interface Value {
  isValid: boolean;
  value: TreasuryProposal;
}

interface ParamState {
  params: Param[];
  values: Value[];
}

const transformProposal = {
  transform: (optProp: Option<TreasuryProposal>) => optProp.unwrapOr(null)
};

function TreasuryCell ({ className = '', value }: Props): React.ReactElement<Props> | null {
  const { api } = useApi();
  const [proposalId] = useState(value.unwrap());
  const proposal = useCall<TreasuryProposal | null>(api.query.treasury.proposals, [proposalId], transformProposal);
  const [{ params, values }, setExtracted] = useState<ParamState>({ params: [], values: [] });

  useEffect((): void => {
    proposal && setExtracted({
      params: [{
        name: 'proposal',
        type: getTypeDef('TreasuryProposal')
      }],
      values: [{
        isValid: true,
        value: proposal
      }]
    });
  }, [proposal]);

  if (!proposal) {
    return null;
  }

  return (
    <div className={className}>
      <Params
        isDisabled
        params={params}
        values={values}
      />
    </div>
  );
}

export default React.memo(TreasuryCell);
