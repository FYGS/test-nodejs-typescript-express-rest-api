# NodeJS/Express REST API using TypeScript

## Dependencies:
- NodeJS >= 12

### Development:
- `npm run serve` and browse to `http://localhost:8000/`
### Production:
- `npm start`

### API endpoints:
- Get all companies: `GET /companies`
- Add a company: `POST /companies`
- Modify a company based on its siren: `PUT /companies/:siren`
- Remove a company based on its siren: `DELETE /companies/:siren`
- Get a company based on its siren: `GET /companies/:siren`
- Get all companies related to a sector: `GET /companies/filter/:sector`
- Get The two last year results of a company based on its siren: `GET /companies/:siren/compare`

