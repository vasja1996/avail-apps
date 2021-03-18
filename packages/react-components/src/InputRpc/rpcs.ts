// Copyright 2017-2021 @polkadot/react-components authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { Text } from '@maticnetwork/da-types';
import type { RuntimeVersion } from '@maticnetwork/da-types/interfaces';
import type { DefinitionRpc, DefinitionRpcExt, Registry } from '@maticnetwork/da-types/types';

import jsonrpc from '@maticnetwork/da-types/interfaces/jsonrpc';
import { getSpecRpc } from '@maticnetwork/da-types-known';

function toExt (section: string, input: Record<string, DefinitionRpc>): Record<string, DefinitionRpcExt> {
  return Object.entries(input).reduce((output: Record<string, DefinitionRpcExt>, [method, def]): Record<string, DefinitionRpcExt> => {
    output[method] = {
      isSubscription: false,
      jsonrpc: `${method}_${section}`,
      method,
      section,
      ...def
    };

    return output;
  }, {});
}

export function getAllRpc (registry: Registry, chain: Text, { specName }: RuntimeVersion): Record<string, Record<string, DefinitionRpcExt>> {
  return Object
    .entries(getSpecRpc(registry, chain, specName))
    .reduce((all: Record<string, Record<string, DefinitionRpcExt>>, [section, contents]): Record<string, Record<string, DefinitionRpcExt>> => {
      all[section] ??= toExt(section, contents);

      return all;
    }, { ...jsonrpc });
}
