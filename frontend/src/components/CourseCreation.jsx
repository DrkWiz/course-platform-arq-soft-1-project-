import { useState } from "react";
import Button from "./Button";
import InputField from "./Input";
import Section from "./Section";

const CourseCreation = () => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    //const [image, setImage] = useState('');
    //const [category, setCategory] = useState('');
    const [price, setPrice] = useState(0.00);
    //const [duration, setDuration] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault()
        const token = localStorage.getItem("token");
        const response = await fetch("http://localhost:8080/courses", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                'Authorization': `Bearer ${token}`, 
            },
            body: JSON.stringify({
                name: name,
                description: description,
                price: price,
              }),
        });

        if (response.ok) {
            const data = await response.json();
            console.log("Course created succesfully", data);
            // Handle succesful register.
        } else {
            const errorData = await response.json();
            console.error("Course creation failed", errorData);
            // Handle register failure
        }
    }

    return (
        <Section
            className="-mt-[5.25rem]"
            customPaddings>
            <div className="flex justify-center items-center h-screen ">
                <div className="p-8 rounded-lg shadow-lg max-w-md w-full bg-gray-800">
                    <form className="space-y-4 font-semibold" onSubmit={handleSubmit}>
                        <div>
                            <label htmlFor="name" className="block text-withe">Name:</label>
                            <InputField type="text" id="name" name="name" className="w-full" value={name} onChange={(e) => setName(e.target.value)} />
                        </div>
                        <div>
                            <label htmlFor="description" className="block text-withe">Description:</label>
                            <InputField type="text" id="description" name="description" className="w-full" value={description} onChange={(e) => setDescription(e.target.value)} />
                        </div>
                        <div>
                            <label htmlFor="price" className="block text-withe">Price:</label>
                            <InputField type="text" id="price" name="price" className="w-full" value={price} onChange={(e) => setPrice(e.target.value)} />
                        </div>
                        <div className="rounded bg-gray-800">
                            <Button type="submit" className="w-full bg-gray-800 text-white hover:bg-gray-800 rounded text-2xl font-semibold">Create Course</Button>
                        </div>
                    </form>
                </div>
            </div>
        </Section>
    );

};

export default CourseCreation;