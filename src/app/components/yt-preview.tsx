import React from "react";

interface YtPreviewProps {
    link?: string;
}

const YtPreview: React.FC<YtPreviewProps> = ({ link }) => {
    if (!link) return null;

    const embedUrl = link.replace("watch?v=", "embed/");

    return (
        <div className="mb-3" style={{ marginTop: "8px" }}>
            <div className="ratio ratio-16x9">
                <iframe
                    src={embedUrl}
                    title="YouTube video preview"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    style={{ border: 0, width: "100%", height: "100%" }}
                />
            </div>
        </div>
    );
};

export default YtPreview;

// lalu bagiaman cara menggunakannya di dalam komponen lain?
// Anda bisa menggunakannya seperti ini:
// import YtPreview from './YtPreview';
// ...
// <YtPreview link={berita.link} />
//       <div className="entry-meta">
//         <ul>
//           <li>
//             <i className="icon-time"></i> {berita.waktu_publish}
//           </li>
//         </ul>
//       </div>
//       <div className="row clearfix" style={{ marginTop: "8px" }}>
//         <div className="col-lg-8">
//           <div className="tab-content" id="nav-tabContent">
//             <div
//               className="tab-pane fade show active"
//               id="nav-detail"
//               role="tabpanel"
//               aria-labelledby="nav-detail-tab"
//             >
//               <div className="row col-mb-30 mb-0">
//                 {/* Konten utama berita */}
//                 <div className="col-12">
//                   <div className="posts-md">
//                     <div className="entry">
//                       <div className="entry-image">
//                         <Image
//                           src={berita.cover}
//                           alt={berita.judul}
//                           width={800}
//                           height={400}                                                           