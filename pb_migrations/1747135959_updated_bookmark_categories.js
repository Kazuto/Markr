migrate(
  (db) => {
    const dao = new Dao(db);
    const collection = dao.findCollectionByNameOrId("5chb6xqkeq9891y");

    // add
    collection.schema.addField(
      new SchemaField({
        system: false,
        id: "rlnjzuoq",
        name: "bookmarks",
        type: "relation",
        required: false,
        presentable: false,
        unique: false,
        options: {
          collectionId: "0ookmiks4zw3zqa",
          cascadeDelete: false,
          minSelect: null,
          maxSelect: null,
          displayFields: null,
        },
      }),
    );

    collection.schema.addField(
      new SchemaField({
        system: false,
        id: "1obafeys",
        name: "teams",
        type: "relation",
        required: false,
        presentable: false,
        unique: false,
        options: {
          collectionId: "o286g391952tjiv",
          cascadeDelete: false,
          minSelect: null,
          maxSelect: null,
          displayFields: null,
        },
      }),
    );

    return dao.saveCollection(collection);
  },
  (db) => {
    const dao = new Dao(db);
    const collection = dao.findCollectionByNameOrId("5chb6xqkeq9891y");

    // remove
    collection.schema.removeField("rlnjzuoq");
    collection.schema.removeField("1obafeys");

    return dao.saveCollection(collection);
  },
);
