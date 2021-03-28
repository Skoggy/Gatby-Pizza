import React from 'react';
import S from '@sanity/desk-tool/structure-builder';
import { DocumentListItemBuilder } from '@sanity/structure/lib/DocumentListItem';

// build a custom sidebar

export default function Sidebar() {
  return S.list()
    .title(`Slick's Slices`)
    .items([
      S.listItem()
        .title('Home Page')
        .icon(() => <strong>🔥</strong>)
        .child(
          S.editor()
            .schemaType('storeSettings')
            // make new doc id so we dont have random string
            .documentId('downtown')
        ),
      // add in the rest of our doc itmes
      ...S.documentTypeListItems().filter(
        (item) => item.getId() !== 'storeSettings'
      ),
    ]);
}
