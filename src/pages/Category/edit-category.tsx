import axios from "axios";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useHistory, useParams } from "react-router";

type IFormInput = {

  categoryId: number,
  categoryName: string



}

export function EditCategory() {
  let { categoryId } = useParams<any>();
  const { register, handleSubmit, formState: { errors }, reset } = useForm<IFormInput>();
  const [category, setCategory] = useState();
  const [error, setError] = useState(null);
  let history = useHistory();


  useEffect(() => {
    (async () => {
      axios
        .get(`https://localhost:5001/api/Category/${categoryId}`)
        .then((res) => res.data)
        .then((data) => {
          setCategory(data);
          reset({

            categoryId: data.categoryId,
            categoryName: data.categoryName

          });
        })
        .catch((err) => console.log(err));
    })();
  }, []);


  async function onSubmit(data: IFormInput) {
    const Category = {
      categoryId: data.categoryId,
      categoryName: data.categoryName
    };
    try {
      await axios.put(`https://localhost:5001/api/Category/${categoryId}`, Category);
      history.push("/category")
      alert('Success');
    } catch (err) {
      setError(err);
    }
  }

  return (


    <form onSubmit={handleSubmit(onSubmit)}>

      <div >
        <div className="form-group">
          <input {...register("categoryId")} className="form-control" id="exampleFormControlInput1" placeholder="" hidden />
        </div>
        <div className="form-group">
          <label htmlFor="exampleFormControlInput1">Category Name</label>
          <input {...register("categoryName", { required: true })} className="form-control" id="exampleFormControlInput1" placeholder="" />
          {errors?.categoryName?.type === "required" && <p>This field is required</p>}
        </div>

        <button id="signupSubmit" type="submit" className="btn btn-info btn-block">Update book</button>
        {error && <p>Something went wrong!</p>}
      </div>


    </form>


  )
}
export default EditCategory;


