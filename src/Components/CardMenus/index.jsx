const CardMenus = ({ href = "#", icon = "view_module", title = "Operaciones", iconColor = "#002fe9", fontSize = "36px" }) => {
    return (
        <>
        <a href={href} style={{ textDecoration: "none" }}>
            <div className="card h-100 bg-white border  card-mosaicos">
                <div className="card-body">
                    <div className="p-0 m-0 mb-3 mt-1">
                    <span
                        className="material-symbols-rounded"
                        style={{ fontSize: fontSize, color: iconColor}}
                    >
                        {icon}
                    </span>
                    </div>
                    <h6>{title}</h6>
                </div>
            </div>
        </a>
        </>
    );
};

export default CardMenus;