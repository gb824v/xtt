package com.mobixell.xtt.jacorbtest;

/**
 *	Generated from IDL interface "TestServer"
 *	@author JacORB IDL compiler V 2.2.3, 10-Dec-2005
 */

public final class TestServerHelper
{
	public static void insert (final org.omg.CORBA.Any any, final com.mobixell.xtt.jacorbtest.TestServer s)
	{
			any.insert_Object(s);
	}
	public static com.mobixell.xtt.jacorbtest.TestServer extract(final org.omg.CORBA.Any any)
	{
		return narrow(any.extract_Object()) ;
	}
	public static org.omg.CORBA.TypeCode type()
	{
		return org.omg.CORBA.ORB.init().create_interface_tc("IDL:com/mobixell/xtt/jacorbtest/TestServer:1.0", "TestServer");
	}
	public static String id()
	{
		return "IDL:com/mobixell/xtt/jacorbtest/TestServer:1.0";
	}
	public static TestServer read(final org.omg.CORBA.portable.InputStream in)
	{
		return narrow(in.read_Object());
	}
	public static void write(final org.omg.CORBA.portable.OutputStream _out, final com.mobixell.xtt.jacorbtest.TestServer s)
	{
		_out.write_Object(s);
	}
	public static com.mobixell.xtt.jacorbtest.TestServer narrow(final java.lang.Object obj)
	{
		if (obj instanceof com.mobixell.xtt.jacorbtest.TestServer)
		{
			return (com.mobixell.xtt.jacorbtest.TestServer)obj;
		}
		else if (obj instanceof org.omg.CORBA.Object)
		{
			return narrow((org.omg.CORBA.Object)obj);
		}
		throw new org.omg.CORBA.BAD_PARAM("Failed to narrow in helper");
	}
	public static com.mobixell.xtt.jacorbtest.TestServer narrow(final org.omg.CORBA.Object obj)
	{
		if (obj == null)
			return null;
		try
		{
			return (com.mobixell.xtt.jacorbtest.TestServer)obj;
		}
		catch (ClassCastException c)
		{
			if (obj._is_a("IDL:com/mobixell/xtt/jacorbtest/TestServer:1.0"))
			{
				com.mobixell.xtt.jacorbtest._TestServerStub stub;
				stub = new com.mobixell.xtt.jacorbtest._TestServerStub();
				stub._set_delegate(((org.omg.CORBA.portable.ObjectImpl)obj)._get_delegate());
				return stub;
			}
		}
		throw new org.omg.CORBA.BAD_PARAM("Narrow failed");
	}
	public static com.mobixell.xtt.jacorbtest.TestServer unchecked_narrow(final org.omg.CORBA.Object obj)
	{
		if (obj == null)
			return null;
		try
		{
			return (com.mobixell.xtt.jacorbtest.TestServer)obj;
		}
		catch (ClassCastException c)
		{
				com.mobixell.xtt.jacorbtest._TestServerStub stub;
				stub = new com.mobixell.xtt.jacorbtest._TestServerStub();
				stub._set_delegate(((org.omg.CORBA.portable.ObjectImpl)obj)._get_delegate());
				return stub;
		}
	}
}
