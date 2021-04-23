import axios from "axios";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useHistory, useParams } from "react-router";
import { GetListCategory } from "../Category/CategoryService/getlistCategory";
import { GetBookById } from "./BookService/getBookById";
import { PutBook } from "./BookService/putBook";

type IFormInput = {
  bookId: number,
  title: string,
  author: string,
  image: string,
  categoryId: number,
  description: string


}

export function EditBook() {
  let { bookId } = useParams<any>();
  const { register, handleSubmit, formState: { errors },reset } = useForm<IFormInput>();
  const [book, setBook] = useState();
  const [category, setCategory] = useState([]);
  const [error, setError] = useState(null);
  let history = useHistory();

  useEffect(() => {
    (async () => {
        GetListCategory()
        .then((res) => res.data)
        .then((data) => {
          setCategory(data);
        })
        .catch((err) => setError(err));
    })();
  }, []);

  useEffect(() => {
    (async () => {
        GetBookById(bookId)
        .then((res) => res.data)
        .then((data) => {
          setBook(data);
          reset({
            bookId: data.bookId,
            title: data.title,
            author: data.author,
            image: data.image,
            categoryId: data.categoryId,
            description: data.description
          });
        })
        .catch((err) => console.log(err));
    })();
  }, []);


  async function onSubmit (data: IFormInput)  {
     const Book = {
      bookId: data.bookId,
      title: data.title,
      author: data.author,
      image: data.image,
      categoryId: data.categoryId,
      description: data.description
    };
    try {
      await PutBook(bookId, Book);
      alert('Success');
      history.push("/admin");
    } catch (err) {
      setError(err);
    }
  }
  
  return (
    

    <form onSubmit={handleSubmit(onSubmit)}>
        
        <div >
        <div className="form-group">
        <input {...register("bookId")}   className="form-control" id="exampleFormControlInput1" placeholder="" hidden />
        
      </div>
          <div className="form-group">
        <label htmlFor="exampleFormControlInput1">Title</label>
        <input {...register("title", { required: true })}   className="form-control" id="exampleFormControlInput1" placeholder="" />
        {errors?.title?.type === "required" && <p>This field is required</p>}
      </div>
      <div className="form-group">
        <label htmlFor="exampleFormControlInput1">Author</label>
        <input {...register("author", { required: true })}  className="form-control" id="exampleFormControlInput1" placeholder="" />
        {errors?.author?.type === "required" && <p>This field is required</p>}
        
      </div>
      <div className="form-group">
        <label htmlFor="exampleFormControlSelect1">Category ID</label>
        <select  {...register("categoryId")} className="form-control" id="exampleFormControlSelect1">
        {category &&
        category.length >= 0 &&
        category.map((c: any) => (
          <option value={c.categoryId} >{c.categoryName}</option>
         
          ))}
        </select>
      </div>
      <div className="form-group">
        <label htmlFor="exampleFormControlInput1">Image</label>
        <input {...register("image")}  className="form-control" id="exampleFormControlInput1" placeholder="" />
        
      </div>

      <div className="form-group">
        <label htmlFor="exampleFormControlTextarea1">Description</label>
        <textarea  {...register("description")} className="form-control" id="exampleFormControlTextarea1" rows={3} defaultValue={""} />
      </div>
      <button id="signupSubmit" type="submit" className="btn btn-info btn-block">Update book</button>
      {error && <p>Something went wrong!</p>}
        </div>
  
     
    </form>


  )
}
export default EditBook;


