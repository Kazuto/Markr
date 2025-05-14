migrate(
  (db) => {
    const collection = new Collection({
      id: "5chb6xqkeq9891y",
      created: "2025-05-13 11:14:57.964Z",
      updated: "2025-05-13 11:24:02.116Z",
      name: "categories",
      type: "base",
      system: false,
      schema: [
        {
          system: false,
          id: "avzmhhpu",
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
          id: "rebt9hzt",
          name: "order",
          type: "number",
          required: false,
          presentable: false,
          unique: false,
          options: {
            min: null,
            max: null,
            noDecimal: true,
          },
        },
        {
          system: false,
          id: "6xivmgmm",
          name: "color",
          type: "text",
          required: false,
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
          id: "otnszkqf",
          name: "icon",
          type: "text",
          required: false,
          presentable: false,
          unique: false,
          options: {
            min: null,
            max: null,
            pattern: "",
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

    collection.listRule = "";
    collection.viewRule = "";

    return Dao(db).saveCollection(collection);
  },
  (db) => {
    const dao = new Dao(db);
    const collection = dao.findCollectionByNameOrId("5chb6xqkeq9891y");

    return dao.deleteCollection(collection);
  },
);
