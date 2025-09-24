import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"

type Props = {
  currentPage: number
  lastPage: number
  onPageChange: (page: number) => void
}

const CoursePagination = ({ currentPage, lastPage, onPageChange }: Props) => {
  const pages = []
  for (let i = 1; i <= lastPage; i++) pages.push(i)

  return (
    <div className="flex justify-center mt-6">
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              onClick={() => onPageChange(currentPage - 1)}
              className={currentPage === 1 ? "pointer-events-none opacity-50" : ""}
            />
          </PaginationItem>

          {pages.map((page) =>
            page === currentPage ? (
              <PaginationItem key={page}>
                <PaginationLink isActive>{page}</PaginationLink>
              </PaginationItem>
            ) : (
              <PaginationItem key={page}>
                <PaginationLink onClick={() => onPageChange(page)}>{page}</PaginationLink>
              </PaginationItem>
            )
          )}

          {lastPage > 5 && currentPage < lastPage - 2 && (
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
          )}

          <PaginationItem>
            <PaginationNext
              onClick={() => onPageChange(currentPage + 1)}
              className={currentPage === lastPage ? "pointer-events-none opacity-50" : ""}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  )
}

export default CoursePagination
