migrate(
  (db) => {
    const dao = new Dao(db);
    const collection = dao.findCollectionByNameOrId("_pb_users_auth_");

    // add
    collection.schema.addField(
      new SchemaField({
        system: false,
        id: "u8dvtqyn",
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

    collection.schema.addField(
      new SchemaField({
        system: false,
        id: "2gayfglm",
        name: "is_admin",
        type: "bool",
        required: false,
        presentable: false,
        unique: false,
        options: {},
      }),
    );

    collection.listRule = '@request.auth.id != ""';
    collection.viewRule = '@request.auth.id != ""';
    collection.createRule = "@request.auth.is_admin = true";
    collection.updateRule =
      "id = @request.auth.id || @request.auth.is_admin = true";
    collection.deleteRule =
      "id = @request.auth.id || @request.auth.is_admin = true";

    return dao.saveCollection(collection);
  },
  (db) => {
    const dao = new Dao(db);
    const collection = dao.findCollectionByNameOrId("_pb_users_auth_");

    // remove
    collection.schema.removeField("u8dvtqyn");
    collection.schema.removeField("2gayfglm");

    collection.listRule = "";
    collection.viewRule = "";
    collection.createRule = "";
    collection.updateRule = "id = @request.auth.id";
    collection.deleteRule = "id = @request.auth.id";

    return dao.saveCollection(collection);
  },
);
