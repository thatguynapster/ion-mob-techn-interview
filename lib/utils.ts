import Router from 'next/router'

/** navigate pages */
export const navigate = (pagename = '', query = {}) => {
  Router.push({
    pathname: `/${pagename}`,
    query: query
  })
}

/** get queries from url */
export const get_query = (query_name: string) => {
  var urlParams = new URLSearchParams(window.location.search)
  var query = urlParams.get(query_name)
  return query
}
