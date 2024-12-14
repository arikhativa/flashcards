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
NOTE - MIGRATION_NAME must be lowercase and spaces -> "_"!!! 

then we want to update the migrations list with:
```
npm run updateMigrations
```
NOTE - make sure the order of migrations stays the same

now when running the app the new migrations will be added :)


# Random Error
if you get an error like this:
```
 (NOBRIDGE) ERROR  Warning: A props object containing a "key" prop is being spread into JSX:
  let props = {key: someKey, route: ..., borderless: ..., centered: ..., rippleColor: ..., onPress: ..., onLongPress: ..., testID: ..., accessibilityLabel: ..., accessibilityRole: ..., accessibilityState: ..., style: ..., children: ...};
  <Touchable {...props} />
React keys must be passed directly to JSX without using spread:
  let props = {route: ..., borderless: ..., centered: ..., rippleColor: ..., onPress: ..., onLongPress: ..., testID: ..., accessibilityLabel: ..., accessibilityRole: ..., accessibilityState: ..., style: ..., children: ...};
  <Touchable key={someKey} {...props} />
    in BottomNavigation.Bar (created by BottomNavigation)
```
then replace the line in this file:
```
node_modules/react-native-paper/src/components/BottomNavigation/BottomNavigationBar.tsx
```
Bad line:
```
renderTouchable = (props: TouchableProps<Route>) => <Touchable {...props} />,
```
good line:
```
renderTouchable = ({ key, ...props }: TouchableProps<Route>) => <Touchable key={key} {...props} />,
```

# New Arch
Currently RNP does not support the new arch.
so now in the android/gradle.properties the "newArchEnabled" is set to false.

change this when the time is right :)