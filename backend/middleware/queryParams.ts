// queryParamTypes.ts

type QueryParamType = 'string' | 'number' | 'boolean'

type QueryParamTypes = Record<string, QueryParamType>

const queryParamTypes: QueryParamTypes = {
  courseId: 'string',
  courseName: 'string',
  semester: 'number',
  category: 'string',
  teacher: 'string',
  ects: 'number',
  page: 'number',
  pageSize: 'number'
}
export default queryParamTypes
