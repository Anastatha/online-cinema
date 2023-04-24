create folder db/data-source.ts

```typescript
import {DataSource, DataSourceOptions} from 'typeorm'

export const dataSourceOptions: DataSourceOptions = {
		type: 'postgres',
		host: 'localhost',
		port: 5432,
		username: 'postgres',
		password: '',
		database: 'booking',
		entities: [RoomEntity],//['/dist/**/ *.entity.js']
		migrations: ['dist/db/migrations/*.js'] 
}

const dataSource = new DataSource(dataSourceOptions)
export default dataSource


app.module

import: [
    TypeOrmModule.forRoot({dataSourceOptions}),
	RoomModule
]

"typeorm": "npm run build && npx typeorm -d dist/db/data-source.js",
"migration:generate": "npm run typeorm -- migration:generate",
"migration:run": "npm run typeorm -- migration:run",
"migration:revert": "npm run typeorm -- migration:revert"