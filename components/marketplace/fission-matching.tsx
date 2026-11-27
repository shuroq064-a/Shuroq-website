"use client";

import { useMemo, useState } from "react";
import { BadgeCheck } from "lucide-react";

import { FilterMenu, FilterToolbar, type FilterChip, type FilterField } from "@/components/arc/filter-toolbar/filter-toolbar";
import { Rating } from "@/components/arc/rating/rating";
import {
  SortableDataTable,
  type DataColumn,
} from "@/components/arc/sortable-data-table/sortable-data-table";

export type FissionExpert = {
  id: string;
  name: string;
  discipline: string;
  specialty: string;
  rating: number;
  reviews: number;
  rate: number;
  availability: string;
  verified: boolean;
};


export const fissionExperts: FissionExpert[] = [
  {
    id: "aysha",
    name: "Aysha Karim",
    discipline: "Engineering",
    specialty: "Kubernetes platform build",
    rating: 4.9,
    reviews: 87,
    rate: 95,
    availability: "Available now",
    verified: true,
  },
  {
    id: "dev",
    name: "Dev Prakash",
    discipline: "Engineering",
    specialty: "Platform migration",
    rating: 4.7,
    reviews: 54,
    rate: 88,
    availability: "Next week",
    verified: true,
  },
  {
    id: "mira",
    name: "Mira Salvi",
    discipline: "Design",
    specialty: "Product and interface design",
    rating: 4.8,
    reviews: 126,
    rate: 80,
    availability: "Available now",
    verified: true,
  },
  {
    id: "tomas",
    name: "Tomás Ferreira",
    discipline: "Design",
    specialty: "Design systems and tokens",
    rating: 4.6,
    reviews: 41,
    rate: 76,
    availability: "Next week",
    verified: false,
  },
  {
    id: "ridhi",
    name: "Ridhi Banerjee",
    discipline: "Data and AI",
    specialty: "Applied machine learning",
    rating: 4.9,
    reviews: 63,
    rate: 110,
    availability: "Available now",
    verified: true,
  },
  {
    id: "omar",
    name: "Omar Haddad",
    discipline: "Data and AI",
    specialty: "Data platforms and pipelines",
    rating: 4.5,
    reviews: 38,
    rate: 92,
    availability: "In two weeks",
    verified: true,
  },
  {
    id: "nadia",
    name: "Nadia Volkov",
    discipline: "Security",
    specialty: "Cloud security posture",
    rating: 4.8,
    reviews: 72,
    rate: 105,
    availability: "Next week",
    verified: true,
  },
  {
    id: "sam",
    name: "Sam Okonkwo",
    discipline: "Marketing",
    specialty: "Developer marketing",
    rating: 4.4,
    reviews: 29,
    rate: 70,
    availability: "Available now",
    verified: false,
  },
];

const fields: FilterField[] = [
  {
    id: "discipline",
    label: "Discipline",
    options: [
      { value: "Engineering", label: "Engineering" },
      { value: "Design", label: "Design" },
      { value: "Data and AI", label: "Data and AI" },
      { value: "Security", label: "Security" },
      { value: "Marketing", label: "Marketing" },
    ],
  },
];

export function FissionMatching() {
  const [filters, setFilters] = useState<FilterChip[]>([]);

  const rows = useMemo(() => {
    const discipline = filters.find((filter) => filter.id === "discipline")?.value;
    if (!discipline) return fissionExperts;
    return fissionExperts.filter((expert) => expert.discipline === discipline);
  }, [filters]);

  const columns: DataColumn<FissionExpert>[] = [
    {
      key: "name",
      label: "Expert",
      sortable: true,
      render: (_value, row) => (
        <span style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
          {row.name}
          {row.verified ? (
            <BadgeCheck size={15} strokeWidth={1.7} aria-label="Verified provider" />
          ) : null}
        </span>
      ),
    },
    { key: "discipline", label: "Discipline", sortable: true },
    { key: "specialty", label: "Speciality" },
    {
      key: "rating",
      label: "Rating",
      sortable: true,
      render: (_value, row) => (
        <Rating
          label={`${row.name} rating`}
          value={row.rating}
          readOnly
          showValue={false}
          size="sm"
          allowHalf
        />
      ),
    },
    { key: "reviews", label: "Reviews", sortable: true, numeric: true },
    {
      key: "rate",
      label: "Rate",
      sortable: true,
      numeric: true,
      render: (value) => `$${Number(value)} / hr`,
    },
    { key: "availability", label: "Availability" },
  ];

  return (
    <div>
      <FilterToolbar
        label="Filters"
        filters={filters}
        onRemove={(id) => setFilters((current) => current.filter((filter) => filter.id !== id))}
        onClearAll={() => setFilters([])}
        addFilter={{
          fields,
          onAdd: (filter) =>
            setFilters((current) => [...current.filter((entry) => entry.id !== filter.id), filter]),
          label: "Filter by discipline",
        }}
      >
        <FilterMenu
          fields={fields}
          label="Filter by discipline"
          active={filters}
          onSelect={(filter) =>
            setFilters((current) => [...current.filter((entry) => entry.id !== filter.id), filter])
          }
        />
      </FilterToolbar>

      <SortableDataTable
        rows={rows}
        columns={columns}
        rowKey="id"
        caption="Available experts on Fission"
        emptyMessage="No experts match that filter yet."
        selectable
        itemName={{ one: "expert", other: "experts" }}
        defaultSort={{ key: "rating", direction: "desc" }}
      />
    </div>
  );
}
