// Copyright 2017-2021 @polkadot/apps-config authors & contributors
// SPDX-License-Identifier: Apache-2.0
// import type  {H256}  from '@polkadot/types/interfaces';
// eslint-disable-next-line header/header
import type { OverrideBundleDefinition } from '@polkadot/types/types';

// structs need to be in order
/* eslint-disable sort-keys */

const definitions: OverrideBundleDefinition = {
  types: [
    {
      // on all versions
      minmax: [0, undefined],
      types: {
        AppId: 'Compact<u32>',
        DataLookupIndexItem: { 
          appId: 'AppId',
          start: 'Compact<u32>'
        },
        DataLookup: {
          size: 'Compact<u32>',
          index: 'Vec<DataLookupIndexItem>'
        },
        KateCommitment: {
          rows: 'Compact<u16>',
          cols: 'Compact<u16>',
          dataRoot: 'H256',
          commitment: 'Vec<u8>'
        },
        V1HeaderExtension: {
          commitment: 'KateCommitment',
          appLookup: 'DataLookup'
        },
        VTHeaderExtension: {
          newField: 'Vec<u8>',
          commitment: 'KateCommitment',
          appLookup: 'DataLookup'
        },
        HeaderExtension: {
          _enum: {
            V1: 'V1HeaderExtension',
            VTest: 'VTHeaderExtension'
          }
        },
        DaHeader: {
          parentHash: 'Hash',
          number: 'Compact<BlockNumber>',
          stateRoot: 'Hash',
          extrinsicsRoot: 'Hash',
          digest: 'Digest',
          extension: 'HeaderExtension'
        },
        Header: 'DaHeader',
        CheckAppIdExtra: {
          appId: 'AppId'
        },
        CheckAppIdTypes: {},
        CheckAppId: {
          extra: 'CheckAppIdExtra',
          types: 'CheckAppIdTypes'
        }
      }
    }
  ],
  signedExtensions: {
    CheckAppId: {
      extrinsic: {
        appId: 'AppId'
      },
      payload: {}
    }
  }
};

console.log('Add DA definitions');

export default definitions;
