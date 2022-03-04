import React, {useState, useEffect} from "react";
import { useParams } from "react-router-dom";
import sanityClient from "../client.js";
import BlockContent from "@sanity/block-content-to-react";

export default function SingleProject() {
  const [singleProjectData, setSingleProjectData] = useState(null);
  const { slug } = useParams();

  useEffect(() =>{
    sanityClient.fetch(`*[slug.current == "${slug}"]{
      title,
      _id,
      slug,
      mainImage{
        asset->{
          _id,
          url
        }
      },
      body,
      "name": author-> name,
      "authorImage": author-> image
    }`)
    .then((data) => setSingleProjectData(data[0]))
    .catch(console.error);
  }, [slug]);

  if (!singleProjectData) return <h1>No Single Project Data!</h1>

  return (
    <>
      <h1>SingleProject page!</h1>
      <h1>{singleProjectData.title}</h1>
      <h1>{singleProjectData.categories}</h1>
      <img src={singleProjectData.mainImage.asset.url} alt={singleProjectData.name} />
      <div className="prose lg:prose-xl list-disc">
        <BlockContent blocks={singleProjectData.body} projectId="22zf6zhh" dataset="production" />
      </div>
    </>
  )
}