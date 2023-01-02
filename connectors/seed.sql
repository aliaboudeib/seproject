-- Insert Courses
INSERT INTO public.courses("code", "course", "facultyId")
	VALUES ('CSEN 504', 'Software Engineering I', 2);
INSERT INTO public.courses("code", "course", "facultyId")
	VALUES ('CSEN 405', 'Software Engineering', 1);

-- Insert Faculties
INSERT INTO public.faculties("faculty")
	VALUES ('Engineering - Mechnical');
INSERT INTO public.faculties("faculty")
	VALUES ('Engineering - Electrical');
INSERT INTO public.faculties("faculty")
	VALUES ('Computer Science - Software Engineering');
INSERT INTO public.faculties("faculty")
	VALUES ('Computer Science - Data Science');
INSERT INTO public.faculties("faculty")
	VALUES ('Computer Science - Security');

-- Insert Roles
INSERT INTO public.roles("role")
	VALUES ('student');
INSERT INTO public.roles("role")
	VALUES ('admin');

-- Set user role as Admin
UPDATE public.users
	SET "roleId"=2
	WHERE "email"='desoukya@gmail.com';