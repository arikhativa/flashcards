# How to migrations

first init the local fake db with:
```
npm run runMigrations
```

this will run all current migrations on the fake db.

then edit schemas.ts.
NOTE - if you add an Entity then you must include it in both FakeDB.ts and AppDataSource.ts

now we can generate new migrations with:
```
npm run generateMigrations <MIGRATION_NAME>
```
NOTE - MIGRATION_NAME must be lowercase!!! 

then we want to update the migrations list with:
```
npm run updateMigrations
```

now when running the app the new migrations will be added :)