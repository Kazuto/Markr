migrate(
  (db) => {
    const collection = new Collection({
      id: "o286g391952tjiv",
      created: "2025-05-13 11:31:38.171Z",
      updated: "2025-05-13 11:31:38.171Z",
      name: "teams",
      type: "base",
      system: false,
      schema: [
        {
          system: false,
          id: "tr5jlrwl",
          name: "name",
          type: "text",
          required: true,
          presentable: false,
          unique: false,
          options: {
            min: null,
            max: null,
            pattern: "",
          },
        },
        {
          system: false,
          id: "6b1shw0e",
          name: "categories",
          type: "relation",
          required: false,
          presentable: false,
          unique: false,
          options: {
            collectionId: "5chb6xqkeq9891y",
            cascadeDelete: false,
            minSelect: null,
            maxSelect: null,
            displayFields: null,
          },
        },
      ],
      indexes: [],
      listRule: null,
      viewRule: null,
      createRule: null,
      updateRule: null,
      deleteRule: null,
      options: {},
    });

    collection.listRule = '@request.auth.id != ""';
    collection.viewRule = '@request.auth.id != ""';

    return Dao(db).saveCollection(collection);
  },
  (db) => {
    const dao = new Dao(db);
    const collection = dao.findCollectionByNameOrId("o286g391952tjiv");

    return dao.deleteCollection(collection);
  },
);
