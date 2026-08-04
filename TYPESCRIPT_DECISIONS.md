# Type Decisions and Alternatives

## 1 Type for MovieType

Used 'Type' to define the structure

```ts
export type MovieType = {
  id: string;
  imgSrc: string;
  movie: string;
  director: string;
  year: string;
  description: string;
};
```

Instead of
`any` or `Object`

```ts
const movie: any = {};
```

### Why ?

- Provides compile time type safety
- Ensures every movie object has consistent structure

## 2 Type-Only Import

Used

```ts
import type { MovieType } from "./types";
```

Instead of

```ts
import { MovieType } from "./types";
```

### Why?

- Removes unnecessary runtime imports.
- Clearly distinguishes type imports from runtime values.

# 3. Strict Type Checking

Enabled

```json
"strict":true
```

Instead of

```json
"strict":false
```

### Why?

- Detects null and undefined issues.
- Prevents implicit any type
- Find errors during compile time instead of run time

# 4. Path Aliases

Configured

```json
"paths": {
    "@utils/*": ["src/utils/*"],
    "@components/*": ["src/components/*"]
}
```

instead of

```ts
import { store } from "../../utils/store";
```

### Why?

- Cleaner imports
- Avoids long relative path.

# 5. Action Type

Used 'type' to define the structure

```ts
export type ActionType =
  | {
      type: "ROUTE_CHANGED";
      payload: {
        path: string;
        params: Record<string, string>;
      };
    }
  | {
      type: "CREATE_MOVIE";
      payload: MovieType;
    }
  | {
      type: "USER_CHANGED";
      payload: string;
    }
  | {
      type: "DELETE_MOVIE";
      payload: string;
    };
```

Instead of `any`

### Why?

- Correctly handles action type and its associated payload value
- Make the readability more easier
