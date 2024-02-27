import Link from "next/link";
import Image from "next/image";
import { auth } from "@clerk/nextjs";

import Header from "@/components/shared/Header";
import TransformedImage from "@/components/shared/TransformedImage";
// import { DeleteConfirmation } from "@/components/shared/DeleteConfirmation";
import { Button } from "@/components/ui/button";
import { getImageById } from "@/lib/actions/image.actions";
import { getImageSize } from "@/lib/utils";
import DeleteConfirmation from "@/components/shared/DeleteConfirmation";

const TransformationsPage = async ({ params: { id } }: SearchParamProps) => {
  const { userId } = auth();

  const image = await getImageById(id);

  return (
    <>
      <Header title={image.title} />

      <section className="flex flex-wrap gap-4 mt-5">
        <div className="flex gap-2 p-14-medium md:p-16-medium">
          <p className="text-dark-600">Transformation</p>
          <p className="capitalize text-purple-400">
            {image.transformationType}
          </p>
        </div>

        {image.prompt && (
          <>
            <p className="hidden text-dark-400/50 md:block">&#x25CF;</p>
            <div className="flex gap-2 p-14-medium md:p-16-medium">
              <p className="text-dark-600">Prompt:</p>
              <p className="capitalize text-purple-400">{image.prompt}</p>
            </div>
          </>
        )}

        {image.color && (
          <>
            <p className="hidden text-dark-400/50 md:block">&#x25CF;</p>
            <div className="flex gap-2 p-14-medium md:p-16-medium">
              <p className="text-dark-600">Prompt:</p>
              <p className="capitalize text-purple-400">{image.color}</p>
            </div>
          </>
        )}

        {image.aspectRatio && (
          <>
            <p className="hidden text-dark-400/50 md:block">&#x25CF;</p>
            <div className="flex gap-2 p-14-medium md:p-16-medium">
              <p className="text-dark-600">Prompt:</p>
              <p className="capitalize text-purple-400">{image.aspectRatio}</p>
            </div>
          </>
        )}
      </section>

      <section className="mt-10 border-t border-dark-400/15">
        <div className="transformation-grid">
          <div className="flex flex-col gap-4">
            <h3 className="h3-bold to-dark-600">Original</h3>

            <Image
              className="transformation-original_image"
              src={image.secureURL}
              alt="image"
              width={getImageSize(image.transformationType, image, "width")}
              height={getImageSize(image.transformationType, image, "height")}
            />
          </div>

          {/* Transformed Image  */}
          <TransformedImage
            image={image}
            type={image.transformationType}
            title={image.title}
            isTransforming={false}
            transformationConfig={image.config}
            hasDownload={true}
          />
        </div>

        {userId === image.author.clerkId && (
          <div className="mt-4 space-y-4">
            <Button className="capitalize submit-button" type="button" asChild>
              <Link href={`/transformations/${image._id}/update`}>
                Update Image
              </Link>
            </Button>

            <DeleteConfirmation imageId={image._id} />
          </div>
        )}
      </section>
    </>
  );
};

export default TransformationsPage;
