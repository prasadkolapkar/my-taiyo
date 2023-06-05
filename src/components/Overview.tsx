import React from 'react'
import { Breadcrumb, BreadcrumbItem } from 'reactstrap';

export default function Overview() {

  return (
    <React.Fragment>

      <Breadcrumb>
        <BreadcrumbItem active>Overview</BreadcrumbItem>
      </Breadcrumb>
      <div className="flex items-center justify-between bg-blue-500 text-white p-4">
        <h1 className="text-2xl font-bold">Overview</h1>
      </div>
    </React.Fragment>
  )
}
