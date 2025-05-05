import { Body, Controller, Get, HttpCode, HttpStatus, Param, Post, Query, Put, Delete, NotFoundException} from "@nestjs/common";

interface Book {
    id: number;
    name: string;
    author: string;
    year: number;
    price: string;
    inStock: number;
}

type UpsertBook = Omit<Book, "id">

interface BooksQuerySearch {
    minPrice: number;
    author: string;
}

@Controller("books")
export class BooksController {
    private books: Book[] = []

    @Get()
    @HttpCode(HttpStatus.OK)
    getBooks(@Query() search: BooksQuerySearch): Book[] {
        
        let filteredBooks = [...this.books];
        let filteredBooksByMinPrice = filteredBooks.filter(
            book => parseFloat(book.price) >= Number(search.minPrice)
        )
        let filteredBooksByAuthor = filteredBooks.filter(
            book => book.author === search.author
        )

        if(search.minPrice) {
            if(filteredBooksByMinPrice.length === 0){
                throw new NotFoundException(`No books with price higher then ${search.minPrice}`)
            }
            else 
            return filteredBooksByMinPrice
        }

        if(search.author) {
            if(filteredBooksByAuthor.length === 0){
                throw new NotFoundException(`No books written by ${search.author}`)
            }
            else 
            return filteredBooksByAuthor
        }

        return filteredBooks;
    }

    @Get("/:id")
    getBooksById(@Param("id") id: string): Book {

    const book = this.books.find(book => book.id === parseInt(id));

    if (!book) {
      throw new NotFoundException(`Book with id: ${id} not found`);
    }

    return book;
    }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    createBook(@Body() bodyBook: UpsertBook ): Book {

        const newBook = {
            ...bodyBook,
            id: Date.now()
        } satisfies Book

        this.books.push(newBook)

        return newBook;
    }

    @Put("/:id")
    updateBook(@Param("id") id: string, @Body() bodyBook: UpsertBook): Book {

        const bookIndex = this.books.findIndex(
            book => book.id === parseInt(id)
        )

        if (bookIndex < 0) {
            throw new NotFoundException(`Update failed. Book with id: ${id} not found`);
        }

        const updatedBook = {
            ...bodyBook,
            id: parseInt(id)
            // name: this.books[bookIndex].name,
            // author: this.books[bookIndex].author,
            // year: this.books[bookIndex].year
        } satisfies Book

        this.books[bookIndex] = updatedBook;
        
        return updatedBook
    }

    @Delete("/:id")
    @HttpCode(HttpStatus.NO_CONTENT)
    deleteBook(@Param("id") id: string): void {

        const bookIndex = this.books.findIndex(
            book => book.id === parseInt(id)
        )

        if (bookIndex < 0) {
            throw new NotFoundException(`You cant delete book that doesn't exist`);
        }

        this.books = this.books.filter(book => book.id !== parseInt(id))
    }

}