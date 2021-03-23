

CREATE DATABASE "coloreando-db";

CREATE TABLE colors (
	id SERIAL NOT NULL,
	name VARCHAR(20) NOT NULL,
	year INTEGER NOT NULL,
	color VARCHAR(20) NOT NULL,
	pantone_value VARCHAR(20) NOT NULL,
	CONSTRAINT pk_colors PRIMARY KEY (id)
);
INSERT INTO colors(name,year,color,pantone_value) VALUES
('cerulean','2000','#98B2D1','15-4020'),
('fuchsia rose','2001','#C74375','17-2031'),
('true red','2002','#BF1932','19-1664'),
('aqua sky','2003','#7BC4C4','14-4811'),
('tigerlily','2004','#E2583E','17-1456'),
('blue turquoise','2005','#53B0AE','15-5217'),
('sand dollar','2006','#DECDBE','13-1106'),
('chili pepper','2007','#9B1B30','19-1557'),
('blue iris','2008','#5A5B9F','18-3943'),
('mimosa','2009','#F0C05A','14-0848'),
('turquoise','2010','#45B5AA','15-5519'),
('honeysuckle','2011','#D94F70','18-2120');