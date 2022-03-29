import "./skeletonPage.scss"
import SkeletonElement from "../SkeletonElement/SkeletonElement";
import SkeletonPoster from "../SkeletonPoster/SkeletonPoster";

const SkeletonPage = () => {
	return (
		<div className="Skeleton__Page" style={{padding:'10px'}}>
			<SkeletonElement type="title" />
			<SkeletonPoster/>
			<SkeletonPoster/>
		</div>
	);
};

export default SkeletonPage;